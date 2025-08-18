
import { GoogleGenAI, Type } from "@google/genai";
import { Agent, ChatMessage, GeminiApiResponse, GeminiPlanResponse, GeminiUserHintResponse } from '../types';
import { AGENT_DATA } from "../constants";
import { DEFAULT_AI_INSTRUCTION, DEFAULT_SYSTEM_INSTRUCTION } from "../constants/instructions";

if (!process.env.API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this context, we'll alert the developer in the console.
  console.error("API_KEY environment variable not set. API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
const model = "gemini-2.5-flash";

const hintSchema = {
    type: Type.OBJECT,
    properties: {
        description: { type: Type.STRING, description: "The descriptive text for the hint." },
        code: { type: Type.STRING, description: "An optional, relevant code snippet or CLI command.", nullable: true }
    },
    required: ["description"]
};

const userPromptHintSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A short, engaging title for the next step (e.g., 'Next Up: Define the Core Logic')." },
        prompt: { type: Type.STRING, description: "A direct, actionable phrase the user can use to start the next step." }
    },
    required: ["title", "prompt"]
};

const comprehensiveResponseSchema = {
    type: Type.OBJECT,
    properties: {
        text: { type: Type.STRING, description: "The main, conversational response from the AI agent." },
        code: { type: Type.STRING, description: "An optional, primary code snippet or command related to the main response.", nullable: true },
        user_prompt_suggestion: { ...userPromptHintSchema, description: "The structured conversation starter for the user's next action." },
        ai_hint: { ...hintSchema, description: "A detailed, contextual explanation from the AI agent's perspective, explaining the 'why'." },
        system_suggestion: { ...hintSchema, description: "A comprehensive, strategic recommendation from the CUA Engine, explaining the 'what'." }
    },
    required: ["text", "user_prompt_suggestion", "ai_hint", "system_suggestion"]
};

const userHintSchema = {
    type: Type.OBJECT,
    properties: {
        suggested_input: { type: Type.STRING, description: "A detailed, progressive suggestion for the user's next input." }
    },
    required: ["suggested_input"]
};

const planResponseSchema = {
  type: Type.OBJECT,
  properties: {
    plan: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          step: { type: Type.INTEGER, description: "The step number in the sequence." },
          title: { type: Type.STRING, description: "The descriptive title for this step." },
          agent: { type: Type.STRING, description: "The name of the agent best suited for this step." },
          prompt: { type: Type.STRING, description: "The precise, self-contained prompt to execute this step." }
        },
        required: ["step", "title", "agent", "prompt"]
      }
    }
  },
  required: ["plan"]
};


async function invokeLLM<T,>(prompt: string, responseSchema: object, retries = 5): Promise<{ success: true, data: T } | { success: false, error: string }> {
    for (let i = 0; i < retries; i++) {
        try {
            const result = await ai.models.generateContent({
                model,
                contents: [{ parts: [{ text: prompt }] }],
                config: {
                    responseMimeType: "application/json",
                    responseSchema: responseSchema,
                }
            });

            const responseText = result.text;
            if (!responseText) {
                 const blockReason = result.candidates?.[0]?.finishReason;
                 if (blockReason) {
                     throw new Error(`Request blocked by API. Reason: ${blockReason}`);
                 }
                 throw new Error("API returned an empty response.");
            }
            
            const parsedJson = JSON.parse(responseText) as T;
            return { success: true, data: parsedJson };

        } catch (error: any) {
            console.error(`Gemini API call failed (attempt ${i + 1}/${retries}):`, error.message);
            if (i === retries - 1) {
                return { success: false, error: error.message || "An unknown error occurred after multiple retries." };
            }
            // Implement exponential backoff with jitter to handle rate limiting.
            const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
            console.log(`Rate limit likely hit. Retrying in ${Math.round(delay/1000)}s...`);
            await new Promise(res => setTimeout(res, delay));
        }
    }
    return { success: false, error: "Max retries exceeded for LLM call." };
}

const generateFullPrompt = (
    agent: Agent,
    systemInstruction: string = DEFAULT_SYSTEM_INSTRUCTION,
    aiInstruction: string = DEFAULT_AI_INSTRUCTION
) => {
    const populatedAiInstruction = aiInstruction
        .replace('{{agent.name}}', agent.name)
        .replace('{{agent.role}}', agent.role)
        .replace('{{agent.philosophy}}', agent.philosophy)
        .replace('{{agent.focus_areas}}', agent.focus_areas.join(', '));
    
    return `${systemInstruction}\n\n${populatedAiInstruction}`;
};

export const getChatResponse = async (
    agent: Agent,
    message: string,
    chatHistory: ChatMessage[],
    systemInstruction?: string,
    aiInstruction?: string
) => {
    const historyText = chatHistory.map(m => `${m.sender}: ${m.content}`).join('\n');
    const basePrompt = generateFullPrompt(agent, systemInstruction, aiInstruction);
    
    const prompt = `${basePrompt}
    
    CONVERSATION HISTORY (don't repeat yourself):
    ${historyText}

    The user's latest message is: "${message}"

    Respond to the user's message, guide them to the next logical step, and provide all required suggestions in the JSON format.`;

    return invokeLLM<GeminiApiResponse>(prompt, comprehensiveResponseSchema);
};

export const generateUserHint = async (agent: Agent, chatHistory: ChatMessage[]) => {
    const historyText = chatHistory.slice(-4).map(m => `${m.sender}: ${m.content}`).join('\n');
    const prompt = `Given the current conversation context with ${agent.name} (last messages: "${historyText}"), provide a detailed, progressive suggestion (2-4 sentences) for the user's next input. Focus on guiding them towards deeper interaction or utilizing more advanced features. Provide only the suggested input text in the required JSON format. Do not use any numbered lists.`;

    return invokeLLM<GeminiUserHintResponse>(prompt, userHintSchema);
};

export const createOrchestrationPlan = async (leadAgent: Agent, goal: string) => {
  const agentNames = AGENT_DATA.map(a => a.name).join(", ");
  const prompt = `You are the AI agent "${leadAgent.name}", an expert ${leadAgent.role}. A user wants to achieve a high-level goal: "${goal}".

  Your task is to act as a master strategist and create a detailed, step-by-step orchestration plan to achieve this goal.

  **Directives:**
  1.  **Deconstruct the Goal:** Break the user's goal into a logical sequence of 3 to 5 smaller, actionable tasks.
  2.  **Assign the Right Agent:** For each step, assign the most suitable agent from the available AI Family: ${agentNames}. You, ${leadAgent.name}, should take the lead on appropriate steps.
  3.  **Formulate Exact Prompts:** For each step, write the precise, self-contained prompt that will be sent to the assigned agent to execute that task. The prompt should be clear and provide enough context.
  4.  **Adhere to the Schema:** Structure your entire output as a JSON object that matches the provided schema. The 'plan' should be an array of step objects.

  **Example Goal:** "Build a real-time chat feature in my app"
  **Example Plan Output (inside the JSON object):**
  "plan": [
    { "step": 1, "title": "Design API Contract", "agent": "LYRA", "prompt": "Design the WebSocket API contract for a real-time chat service, including message formats and events for joining, leaving, and sending messages." },
    { "step": 2, "title": "Scaffold Backend Service", "agent": "KARA", "prompt": "Scaffold a new Node.js backend service with Express and the 'ws' library, based on the API contract designed by LYRA." },
    { "step": 3, "title": "Implement Frontend Component", "agent": "DUDE", "prompt": "Create the React component for the chat interface, including a message display area, an input field, and logic to connect to the WebSocket backend." },
    { "step": 4, "title": "Review for Security Flaws", "agent": "SOPHIA", "prompt": "Review the chat feature's backend and frontend code for potential security vulnerabilities like XSS in messages or improper session handling." }
  ]

  Now, create the plan for the user's goal: "${goal}".`;

  return invokeLLM<GeminiPlanResponse>(prompt, planResponseSchema);
};
