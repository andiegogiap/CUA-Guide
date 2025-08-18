import React, { useState, useEffect } from 'react';

const CogIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

interface CustomInstructionsPanelProps {
  systemInstruction: string;
  aiInstruction: string;
  setSystemInstruction: (instruction: string) => void;
  setAiInstruction: (instruction: string) => void;
}

const CustomInstructionsPanel: React.FC<CustomInstructionsPanelProps> = ({
  systemInstruction,
  aiInstruction,
  setSystemInstruction,
  setAiInstruction,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localSystemInstruction, setLocalSystemInstruction] = useState(systemInstruction);
  const [localAiInstruction, setLocalAiInstruction] = useState(aiInstruction);

  useEffect(() => {
    setLocalSystemInstruction(systemInstruction);
    setLocalAiInstruction(aiInstruction);
  }, [systemInstruction, aiInstruction]);

  const handleSave = () => {
    setSystemInstruction(localSystemInstruction);
    setAiInstruction(localAiInstruction);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 p-3 bg-background-light/50 backdrop-blur-sm text-text-primary rounded-full hover:bg-background-light/80 transition-colors shadow-lg"
        aria-label="Open custom instructions panel"
      >
        <CogIcon />
      </button>

      <div
        className={`fixed top-0 right-0 h-full bg-background-dark/90 backdrop-blur-xl shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } w-full max-w-md flex flex-col`}
      >
        <div className="p-4 border-b border-background-lighter flex justify-between items-center">
          <h2 className="text-xl font-bold text-text-primary">Custom Instructions</h2>
          <button onClick={() => setIsOpen(false)} className="text-2xl text-text-secondary hover:text-text-primary">&times;</button>
        </div>

        <div className="p-4 flex-grow overflow-y-auto">
          <div className="mb-6">
            <label htmlFor="system-instruction" className="block text-lg font-semibold text-text-primary mb-2">
              System Orchestrator Instruction
            </label>
            <p className="text-sm text-text-secondary mb-2">
              {"Defines the high-level rules, the overall goal of the interaction, and the required JSON output format for all AI agents."}
            </p>
            <textarea
              id="system-instruction"
              value={localSystemInstruction}
              onChange={(e) => setLocalSystemInstruction(e.target.value)}
              className="w-full h-64 bg-background-light border border-background-lighter rounded-lg p-3 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-neon-fuchsia font-roboto-mono text-sm"
              placeholder="Enter system-level instructions..."
            />
          </div>

          <div>
            <label htmlFor="ai-instruction" className="block text-lg font-semibold text-text-primary mb-2">
              AI Supervisor Instruction
            </label>
            <p className="text-sm text-text-secondary mb-2">
              {"Defines the core personality and behavior of the individual AI agent. Use placeholders like `{{agent.name}}`, `{{agent.role}}`, `{{agent.philosophy}}`, and `{{agent.focus_areas}}` which will be replaced with the active agent's details."}
            </p>
            <textarea
              id="ai-instruction"
              value={localAiInstruction}
              onChange={(e) => setLocalAiInstruction(e.target.value)}
              className="w-full h-64 bg-background-light border border-background-lighter rounded-lg p-3 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary font-roboto-mono text-sm"
              placeholder="Enter agent personality instructions..."
            />
          </div>
        </div>

        <div className="p-4 border-t border-background-lighter">
          <button
            onClick={handleSave}
            className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold p-3 rounded-lg transition-colors shadow-lg hover:shadow-neon-violet"
          >
            Save and Close
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default CustomInstructionsPanel;