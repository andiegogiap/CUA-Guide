import React from 'react';
import { OrchestrationStep as OrchestrationStepType } from '../types';

const StatusIcon: React.FC<{ status: OrchestrationStepType['status'] }> = ({ status }) => {
    switch (status) {
        case 'completed':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            );
        case 'active':
            return (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-primary animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C3.732 5.943 7.522 3 10 3s6.268 2.943 9.542 7c-3.274 4.057-7.03 7-9.542 7S3.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
            );
        case 'pending':
        default:
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-secondary/70" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
            );
    }
};

const PlayIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);


interface OrchestrationStepProps {
  step: OrchestrationStepType;
  onExecute: (prompt: string, stepNumber: number) => void;
}

const OrchestrationStep: React.FC<OrchestrationStepProps> = ({ step, onExecute }) => {
  const isExecutable = step.status === 'active';

  const baseClasses = "p-3 rounded-lg border flex items-center gap-3 transition-all duration-300";
  const statusClasses = {
    pending: "bg-background-light/30 border-background-lighter text-text-secondary",
    active: "bg-brand-primary/10 border-brand-primary text-text-primary ring-2 ring-brand-primary shadow-neon-violet",
    completed: "bg-background-light/20 border-background-lighter text-text-secondary/50",
  };

  return (
    <div className={`${baseClasses} ${statusClasses[step.status]}`}>
      <div className="flex-shrink-0">
        <StatusIcon status={step.status} />
      </div>
      <div className="flex-grow">
        <p className={`font-semibold text-sm ${step.status === 'completed' ? 'line-through' : ''}`}>
          Step {step.step}: {step.title}
        </p>
        <p className="text-xs text-text-secondary">
          Agent: <span className={`font-bold ${step.status !== 'completed' ? 'text-brand-primary' : ''}`}>{step.agent}</span>
        </p>
      </div>
      <button
        onClick={() => onExecute(step.prompt, step.step)}
        disabled={!isExecutable}
        className="ml-auto flex-shrink-0 flex items-center gap-1.5 bg-background-lighter hover:bg-background-light disabled:bg-background-lighter/50 disabled:text-text-secondary/50 disabled:cursor-not-allowed text-text-primary font-bold py-1.5 px-3 rounded-lg text-xs transition-colors"
      >
        <PlayIcon />
        Execute
      </button>
    </div>
  );
};

export default OrchestrationStep;