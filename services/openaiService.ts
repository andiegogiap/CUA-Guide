
import { Agent, ChatMessage, GeminiApiResponse } from '../types';
import { DEFAULT_AI_INSTRUCTION, DEFAULT_SYSTEM_INSTRUCTION } from '../constants/instructions';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = "gpt-4o";

const getOpenAISystemPrompt = (
    agent: Agent,
    systemInstruction: string = DEFAULT_SYSTEM_INSTRUCTION,
    aiInstruction: string = DEFAULT_AI_INSTRUCTION
) => {
    const populatedAiInstruction = aiInstruction
        .replace('{{agent.name}}', agent.name)
        .replace('{{agent.role}}', agent.role)
        .replace('{{agent.philosophy}}', agent.philosophy)
        .replace('{{agent.focus_areas}}', agent.focus_areas.join(', '));
    
    const strictJsonInstruction = `You MUST respond with a valid JSON object that strictly adheres to the schema defined in the system instruction. Do not include any text outside of the JSON structure, such as markdown code fences.`;

    return `${systemInstruction}\n\n${populatedAiInstruction}\n\n${strictJsonInstruction}`;
};

export const getOpenAIChatResponse = async (
    agent: Agent,
    message: string,
    chatHistory: ChatMessage[],
    systemInstruction?: string,
    aiInstruction?: string
): Promise<{ success: true, data: GeminiApiResponse } | { success: false, error: string }> => {
    if (!process.env.OPENAI_API_KEY) {
        return { success: false, error: "OPENAI_API_KEY environment variable not set." };
    }
    
    const history = chatHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.code ? `${msg.content}\n\`\`\`\n${msg.code}\n\`\`\`` : msg.content
    })).slice(-6); // Keep context reasonable

    try {
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: OPENAI_MODEL,
                messages: [
                    { role: 'system', content: getOpenAISystemPrompt(agent, systemInstruction, aiInstruction) },
                    ...history,
                    { role: 'user', content: message }
                ],
                response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`OpenAI API Error: ${response.statusText} - ${errorData?.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        const responseText = data.choices[0]?.message?.content;
        if (!responseText) {
            throw new Error("OpenAI API returned an empty response.");
        }

        const parsedJson = JSON.parse(responseText) as GeminiApiResponse;
        return { success: true, data: parsedJson };

    } catch (error: any) {
        console.error("OpenAI API call failed:", error.message);
        return { success: false, error: error.message || "An unknown error occurred." };
    }
};
