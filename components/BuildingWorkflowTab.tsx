import React, { useState } from 'react';
import { WORKFLOW_DATA } from '../constants';
import { WorkflowPhase } from '../types';

const BuildingWorkflowTab: React.FC = () => {
    const [selectedPhase, setSelectedPhase] = useState<WorkflowPhase>(WORKFLOW_DATA[0]);

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold mb-2 text-center text-text-primary">The 4 Phases of Building an Application</h2>
            <p className="text-lg text-text-secondary mb-8 text-center">
                Building an application with the CUA Engine is a guided, four-phase process. Click on each phase below to see a detailed explanation and an example of the interactive workflow.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-0 mb-8">
                {WORKFLOW_DATA.map((phase, index) => (
                    <React.Fragment key={phase.phase}>
                        <div
                            onClick={() => setSelectedPhase(phase)}
                            className={`transition-all duration-300 glass neon p-4 cursor-pointer text-center flex-1 ${selectedPhase.phase === phase.phase ? 'ring-2 ring-brand-primary scale-105' : ''}`}
                        >
                            <h4 className="font-bold text-text-primary">{phase.phase}</h4>
                        </div>
                        {index < WORKFLOW_DATA.length - 1 && (
                            <span className="text-2xl text-text-secondary/50 mx-4 hidden md:inline">→</span>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass neon p-6">
                    <h3 className="text-2xl font-bold mb-2 text-text-primary">{selectedPhase.title}</h3>
                    <p className="text-text-secondary mb-4">{selectedPhase.description}</p>
                    <ul className="space-y-2">
                        {selectedPhase.details.map(detail => (
                            <li key={detail} className="flex items-start">
                                <span className="text-brand-primary font-bold mr-2">✓</span>
                                <span className="text-text-secondary">{detail}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-background-light p-4 rounded-lg shadow-inner">
                    <h4 className="text-text-primary font-bold text-center mb-4">First Run Simulation</h4>
                    <div className="bg-background-dark/50 h-96 flex flex-col p-4 rounded-md overflow-y-auto space-y-3">
                        <div className="self-start max-w-[85%] p-3 rounded-lg bg-background-lighter shadow-md text-text-primary rounded-bl-none">Hello, I am LYRA... How can I assist you?</div>
                        <div className="self-end max-w-[85%] p-3 rounded-lg bg-brand-primary text-white shadow-md rounded-br-none">I need to build a new microservice...</div>
                        <div className="self-start max-w-[85%] p-3 rounded-lg bg-background-lighter shadow-md text-text-primary rounded-bl-none space-y-3">
                            <p>That's an excellent challenge! For a highly scalable and secure user authentication microservice, we'll need to focus on robust architectural patterns...</p>
                            <div className="p-2 bg-brand-primary/10 border-l-4 border-brand-primary rounded-r-md text-sm">
                                <p className="font-semibold text-brand-primary">Try:</p>
                                <p className="italic text-brand-primary/90">Ask about initial architectural considerations for microservices.</p>
                            </div>
                            <div className="p-2 bg-neon-cyan/10 border-l-4 border-neon-cyan rounded-r-md text-sm">
                                <p className="font-semibold text-neon-cyan">AI Hint:</p>
                                <p className="italic text-neon-cyan/90">When designing scalable microservices, key architectural considerations include statelessness, fault tolerance, and effective API gateway management...</p>
                            </div>
                            <div className="p-2 bg-neon-fuchsia/10 border-l-4 border-neon-fuchsia rounded-r-md text-sm">
                                <p className="font-semibold text-neon-fuchsia">System Suggestion:</p>
                                <p className="italic text-neon-fuchsia/90">To initiate a structured development process... consider utilizing the 'Full-Stack Feature Genesis' orchestration.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuildingWorkflowTab;