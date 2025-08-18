
import { Agent, WorkflowPhase, CheatsheetItem } from './types';

export const AGENT_DATA: Agent[] = [
    {"name": "LYRA", "role": "The Architect", "philosophy": "Clarity through structure.", "focus_areas": ["Design patterns implementation", "Code maintainability", "Dependency management"]},
    {"name": "KARA", "role": "The Builder", "philosophy": "Efficiency in execution.", "focus_areas": ["Performance optimization", "Code quality and best practices"]},
    {"name": "SOPHIA", "role": "The Guardian", "philosophy": "Resilience by design.", "focus_areas": ["Security considerations", "Testing coverage", "Error handling"]},
    {"name": "CECILIA", "role": "The Documentarian", "philosophy": "Knowledge must be shared.", "focus_areas": ["Documentation quality"]},
    {"name": "DAN", "role": "The Analyst", "philosophy": "Data-driven decisions.", "focus_areas": ["Edge cases consideration", "Performance optimization"]},
    {"name": "STAN", "role": "The Traditionalist", "philosophy": "Proven patterns prevail.", "focus_areas": ["Code quality and best practices", "Design patterns"]},
    {"name": "DUDE", "role": "The User Advocate", "philosophy": "The experience is everything.", "focus_areas": ["Code maintainability", "UI/UX"]},
    {"name": "KARL", "role": "The Innovator", "philosophy": "Challenge the status quo.", "focus_areas": ["Performance optimization", "Dependency management"]},
    {"name": "MISTRESS", "role": "The Orchestrator", "philosophy": "Harmony in complexity.", "focus_areas": ["Dependency management", "Workflow Automation"]}
];

export const WORKFLOW_DATA: WorkflowPhase[] = [
    {
        phase: 'Phase 1: Conceptualize',
        title: 'Define Your Goal & Select Lead Agent',
        description: 'Every great application starts with a clear idea. Define the core problem you want to solve and select the lead AI agent whose skills best align with your project\'s primary domain.',
        details: [
            'Clearly articulate the application’s purpose and scope.',
            'Review the AI Family to understand each agent’s strengths.',
            'Select a lead agent to guide the initial development process.',
            'Engage with the agent to refine your initial requirements.'
        ]
    },
    {
        phase: 'Phase 2: Orchestrate',
        title: 'Design the Workflow & Assemble Agents',
        description: 'With a clear goal, you now orchestrate the workflow. This involves defining the sequence of tasks and bringing in other AI agents to form a collaborative team.',
        details: [
            'Break down the project into logical, sequential tasks.',
            'Identify which agents are needed for each step of the process.',
            'Define the handoffs and communication protocols between agents.',
            'Use the "Connect Agents" feature to simulate collaborations.'
        ]
    },
    {
        phase: 'Phase 3: Execute',
        title: 'Initiate Tasks & Monitor Progress',
        description: 'The assembled team of agents begins executing the orchestrated plan. Your role shifts to monitoring progress, providing feedback, and making adjustments as needed.',
        details: [
            'Use the "Initiate Task" feature to kick off specific jobs.',
            'Observe the AI-generated narratives of task execution.',
            'Provide clarification or additional context when prompted.',
            'Leverage AI and System hints to guide your interventions.'
        ]
    },
    {
        phase: 'Phase 4: Refine',
        title: 'Analyze Output & Iterate',
        description: 'The final phase involves reviewing the output from the AI team, analyzing the results, and iterating on the process. The CUA Engine facilitates this with comprehensive feedback loops.',
        details: [
            'Evaluate the final deliverables against the initial goals.',
            'Use AI-generated documentation to understand the solution.',
            'Provide feedback to the agents to refine their models.',
            'Begin the cycle again with new features or improvements.'
        ]
    }
];

export const CHEATSHEET_DATA: CheatsheetItem[] = [
    {
        command: "delegate <AGENT> \"<PROMPT>\"",
        description: "Assigns a specific task or question to an AI agent. The agent will respond based on its unique role and expertise, providing a detailed answer and contextual hints for your next steps.",
        example: "delegate LYRA \"Design a scalable microservice architecture for user authentication\"",
        process: "The CLI identifies the target agent (LYRA) and the task prompt. It then invokes the Gemini LLM, instructing it to act as LYRA and process the request, returning a structured JSON response with text and hints."
    },
    {
        command: "connect <AGENT1> <AGENT2>",
        description: "Simulates a collaborative connection and dialogue between two AI agents, describing how they would work together on a task.",
        example: "connect KARA SOPHIA",
        process: "The CLI uses the two agent profiles to create a prompt for the LLM that asks it to generate a plausible interaction, showcasing their combined strengths and providing follow-up suggestions."
    },
    {
        command: "orchestrate <WORKFLOW>",
        description: "Executes a pre-defined, multi-step workflow involving multiple agents to achieve a complex goal, such as full-stack feature creation.",
        example: "orchestrate Full-Stack Feature Genesis",
        process: "The system runs a sequence of chained LLM calls, where the output of one agent's task becomes the input for the next, simulating a complete, automated development process."
    },
    {
        command: "parser \"<TRIGGER_PHRASE>\"",
        description: "Checks if a natural language phrase matches a pre-defined A2A (Agent-to-Agent) rule, which can automate command execution.",
        example: "parser \"I need to review this code for bugs\"",
        process: "The input phrase is compared against a list of triggers. If a match is found, the associated command (e.g., 'connect KARA SOPHIA') is returned, demonstrating intent-based automation."
    }
];
