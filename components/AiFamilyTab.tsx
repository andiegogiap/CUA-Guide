import React, { useState } from 'react';
import { Agent } from '../types';
import { AGENT_DATA } from '../constants';
import AgentCard from './AgentCard';
import ActiveAgentControlPanel from './ActiveAgentControlPanel';

interface AiFamilyTabProps {
  systemInstruction: string;
  aiInstruction: string;
}

const AiFamilyTab: React.FC<AiFamilyTabProps> = ({ systemInstruction, aiInstruction }) => {
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);

  const handleSelectAgent = (agent: Agent) => {
    setActiveAgent(agent);
  };

  const handleBackToGrid = () => {
    setActiveAgent(null);
  };

  return (
    <div>
      {activeAgent ? (
        <ActiveAgentControlPanel
          agent={activeAgent}
          onBack={handleBackToGrid}
          systemInstruction={systemInstruction}
          aiInstruction={aiInstruction}
        />
      ) : (
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-text-primary">Meet the AI Family</h2>
          <p className="text-lg text-text-secondary mb-8 text-center">
            The CUA Engine's power comes from its family of specialized AI agents. Each agent has a unique role, philosophy, and set of skills. Click on any agent to learn more and start an interactive session.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {AGENT_DATA.map((agent) => (
              <AgentCard key={agent.name} agent={agent} onSelect={handleSelectAgent} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AiFamilyTab;