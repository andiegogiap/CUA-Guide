import React from 'react';

const SystemIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-fuchsia" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const LightbulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

const UserIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);


const CoreConceptsTab: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold mb-4 text-center text-text-primary">The "Ajentic Flow"</h2>
      <p className="text-lg text-text-secondary mb-6 text-center">
        The CUA Orchestration Engine is designed around a principle called "ajentic flow"—a highly interactive and guided experience for building AI applications. Instead of static documentation, the engine uses its AI agents to proactively offer contextual insights and suggestions, ensuring a seamless journey from your initial idea to a fully orchestrated task.
      </p>
      
      <div className="glass neon p-6">
        <h3 className="text-2xl font-bold mb-4 text-text-primary">The Layered Hinting System</h3>
        <p className="text-text-secondary mb-4">
          After every interaction, the system provides three layers of guidance to ensure you're never left wondering what to do next. This creates a continuous and intuitive conversational flow.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="text-2xl mr-4"><UserIcon/></span>
            <div>
              <h4 className="font-bold text-lg text-text-primary">User Prompt Suggestion (`Try:`)</h4>
              <p className="text-text-secondary">An immediate, actionable prompt you can use for your next conversational step. It's the quickest way to move forward.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-4"><LightbulbIcon /></span>
            <div>
              <h4 className="font-bold text-lg text-text-primary">AI Hint (`AI Hint:`)</h4>
              <p className="text-text-secondary">A deeper technical or conceptual insight from the current AI agent, providing context related to its specific role and expertise.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-4"><SystemIcon /></span>
            <div>
              <h4 className="font-bold text-lg text-text-primary">System Suggestion (`System Suggestion:`)</h4>
              <p className="text-text-secondary">Strategic guidance from the CUA Engine itself, recommending broader actions, different tools, or more complex orchestrations to achieve your goals efficiently.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CoreConceptsTab;