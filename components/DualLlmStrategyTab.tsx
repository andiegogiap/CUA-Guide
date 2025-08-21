import React from 'react';

const SystemIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const LightbulbIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

const FlowChartIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 003 6.75v9A2.25 2.25 0 005.25 18z" />
    </svg>
);

const BrainCircuitIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neon-fuchsia" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M12 5.25v-1.5m0 15v1.5m3.75-18v1.5M19.5 8.25h1.5m-18 0h1.5m15 3.75h1.5m-18 0h1.5m15 3.75h1.5M12 18.75v1.5m3.75-15h-7.5a3 3 0 00-3 3v7.5a3 3 0 003 3h7.5a3 3 0 003-3v-7.5a3 3 0 00-3-3z" />
    </svg>
);


const DualLlmStrategyTab: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold mb-2 text-center text-text-primary">CUA Engine: Dual-LLM Orchestration Strategy</h2>
      <p className="text-lg text-text-secondary mb-8 text-center">
        This guide provides the custom instructions for the "Merge Collective" of AI agents. It defines how Google Gemini and OpenAI models collaborate to create a system that is more robust, creative, and resilient than any single model alone.
      </p>

      <div className="glass neon p-6 mb-6">
        <h3 className="text-2xl font-bold mb-4 text-text-primary">The Core Principle: Architect vs. Advisor</h3>
        <p className="text-text-secondary mb-6">
            We assign distinct roles to each LLM based on their inherent strengths. This specialization ensures that you receive both a structured, executable plan and a creative, alternative perspective for every task.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background-light p-4 rounded-lg border border-background-lighter">
                <div className="flex items-center gap-4 mb-2">
                    <SystemIcon/>
                    <h4 className="text-xl font-bold text-text-primary">Google Gemini: The Architect</h4>
                </div>
                <p className="text-text-secondary mb-2">Gemini serves as the primary driver for planning, structuring, and execution. Its response is the "canonical path" forward.</p>
                <ul className="list-disc list-inside text-text-secondary text-sm space-y-1">
                    <li><strong className="text-text-primary">Strengths:</strong> Logical reasoning, strict adherence to JSON schemas, strategic planning, and detailed code generation.</li>
                    <li><strong className="text-text-primary">Usage:</strong> Ideal for creating orchestration plans, generating boilerplate code, and providing step-by-step guidance through the "ajentic flow".</li>
                    <li><strong className="text-text-primary">Action Gateway:</strong> Its suggestions often include executable CLI commands (`delegate`, `orchestrate`) to move the project forward.</li>
                </ul>
            </div>
             <div className="bg-background-light p-4 rounded-lg border border-background-lighter">
                <div className="flex items-center gap-4 mb-2">
                    <LightbulbIcon/>
                    <h4 className="text-xl font-bold text-text-primary">OpenAI GPT: The Advisor</h4>
                </div>
                 <p className="text-text-secondary mb-2">OpenAI acts as a creative sparring partner, offering alternative viewpoints and challenging assumptions.</p>
                <ul className="list-disc list-inside text-text-secondary text-sm space-y-1">
                    <li><strong className="text-text-primary">Strengths:</strong> Divergent thinking, linguistic nuance, exploring edge cases, and generating a wide array of ideas.</li>
                    <li><strong className="text-text-primary">Usage:</strong> Perfect for brainstorming, refining prompts, identifying potential risks, and providing a "second opinion" on Gemini's structured plan.</li>
                     <li><strong className="text-text-primary">Creative Catalyst:</strong> Its purpose is to ensure you've considered other angles before committing to a path.</li>
                </ul>
            </div>
        </div>
      </div>

       <div className="glass neon p-6 mb-6">
            <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 bg-background-light p-3 rounded-full"><FlowChartIcon/></div>
                <div>
                    <h3 className="text-2xl font-bold text-text-primary">The Orchestration Flow: API-Centric Feedback Loop</h3>
                    <p className="text-text-secondary mt-1">The entire process is managed through a clear, API-driven workflow that places you, the Operator, in control.</p>
                </div>
            </div>
            <ol className="relative border-l border-background-lighter/50 ml-4">                  
                <li className="mb-6 ml-6">            
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-background-light rounded-full -left-3 ring-4 ring-black/50 text-brand-primary font-bold">1</span>
                    <h4 className="font-semibold text-lg text-text-primary">Parallel Invocation</h4>
                    <p className="text-text-secondary text-sm">User input is sent to both Gemini and OpenAI simultaneously through the backend API gateway.</p>
                </li>
                <li className="mb-6 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-background-light rounded-full -left-3 ring-4 ring-black/50 text-brand-primary font-bold">2</span>
                    <h4 className="font-semibold text-lg text-text-primary">Comparative Display</h4>
                    <p className="text-text-secondary text-sm">The UI presents both responses side-by-side, clearly labeling the "Architect's Plan" (Gemini) and the "Advisor's Perspective" (OpenAI).</p>
                </li>
                <li className="mb-6 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-background-light rounded-full -left-3 ring-4 ring-black/50 text-brand-primary font-bold">3</span>
                    <h4 className="font-semibold text-lg text-text-primary">Operator-in-the-Loop</h4>
                    <p className="text-text-secondary text-sm">You make the final decision. You can follow Gemini's structured suggestion, pivot based on OpenAI's idea, or synthesize both into a new prompt.</p>
                </li>
                 <li className="ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-background-light rounded-full -left-3 ring-4 ring-black/50 text-brand-primary font-bold">4</span>
                    <h4 className="font-semibold text-lg text-text-primary">Contextual Feedback Loop</h4>
                    <p className="text-text-secondary text-sm">Your next action updates the conversation history for <strong className="text-text-primary">both</strong> models. This ensures they remain synchronized with the chosen path, creating a cohesive and ever-improving dialogue.</p>
                </li>
            </ol>
      </div>

       <div className="glass neon p-6">
            <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 bg-background-light p-3 rounded-full"><BrainCircuitIcon/></div>
                <div>
                    <h3 className="text-2xl font-bold text-text-primary">Result: A Living Knowledge Base</h3>
                    <p className="text-text-secondary mt-1">This orchestrated process does more than just complete tasks; it builds a project-specific knowledge base.</p>
                </div>
            </div>
            <p className="text-text-secondary">
                Each completed workflow—with its dual-AI inputs and your explicit decisions—becomes a "case study" in your development process. Over time, this history documents not just the "what" but the "why" behind your architectural choices. Future iterations of the CUA Engine can leverage this history to fine-tune agent behavior, making the AI Family smarter and more personalized to your unique style of building.
            </p>
      </div>
    </div>
  );
};

export default DualLlmStrategyTab;