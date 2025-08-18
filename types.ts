
export type Tab = 'concepts' | 'family' | 'workflow' | 'strategy' | 'cheatsheet' | 'auth' | 'settings';

export interface Agent {
  name: string;
  role: string;
  philosophy: string;
  focus_areas: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  code?: string;
  hints?: HintSet; // Hints are now part of the AI message
}

// A more structured hint for AI and System suggestions
export interface Hint {
    description: string;
    code?: string; // For code snippets or CLI commands
}

// A dedicated structure for the user prompt suggestion
export interface UserPromptHint {
    title: string;  // e.g., "Next Up: Define the Core Logic"
    prompt: string; // e.g., "Let's define the TypeScript interfaces for our core data models."
}

export interface HintSet {
  user_prompt_suggestion: UserPromptHint;
  ai_hint: Hint;
  system_suggestion: Hint;
}

export interface GeminiApiResponse {
    text: string;
    code?: string; // AI's primary response can also contain code
    user_prompt_suggestion: UserPromptHint;
    ai_hint: Hint;
    system_suggestion: Hint;
}


export interface GeminiUserHintResponse {
    suggested_input: string;
}


export interface WorkflowPhase {
  phase: string;
  title: string;
  description: string;
  details: string[];
}

export interface CheatsheetItem {
  command: string;
  description: string;
  example: string;
  process: string;
}

// Defines a single step in a multi-agent plan
export interface OrchestrationStep {
  step: number;
  title: string;
  agent: string; // The name of the agent assigned to this step
  prompt: string; // The exact prompt to execute this step
  status: 'pending' | 'active' | 'completed';
}

// Defines the expected structure of the plan from the Gemini API
export interface GeminiPlanResponse {
  plan: Omit<OrchestrationStep, 'status'>[];
}