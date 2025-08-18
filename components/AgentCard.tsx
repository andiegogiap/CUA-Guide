import React from 'react';
import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
  onSelect: (agent: Agent) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(agent)}
      className="glass-card p-6 cursor-pointer text-center transition-all duration-300 hover:transform hover:-translate-y-1 hover:border-brand-primary hover:shadow-neon-violet"
    >
      <h3 className="text-xl font-bold text-brand-primary drop-shadow-[0_0_4px_rgba(138,43,226,0.6)]">{agent.name}</h3>
      <p className="text-text-secondary">{agent.role}</p>
    </div>
  );
};

export default AgentCard;