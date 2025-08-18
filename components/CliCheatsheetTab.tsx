import React, { useState } from 'react';
import { CHEATSHEET_DATA } from '../constants';
import { CheatsheetItem } from '../types';

interface AccordionItemProps {
    item: CheatsheetItem;
    isOpen: boolean;
    onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isOpen, onClick }) => {
    return (
        <div className="glass-card">
            <button
                onClick={onClick}
                className="p-4 w-full flex justify-between items-center text-left"
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${item.command}`}
            >
                <h3 className="text-lg font-semibold">
                    <code className="font-roboto-mono text-brand-primary bg-brand-primary/10 p-1 rounded">{item.command}</code>
                </h3>
                <span className={`text-2xl text-text-secondary/50 transition-transform duration-300 transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
            </button>
            <div 
                id={`accordion-content-${item.command}`}
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
            >
                <div className="px-4 pb-4">
                    <p className="text-text-secondary mb-2">{item.description}</p>
                    <p className="text-text-secondary mb-2">
                        <strong className="font-semibold text-text-primary">Example:</strong> 
                        <code className="font-roboto-mono text-sm bg-background-lighter text-text-primary p-1 rounded ml-1">{item.example}</code>
                    </p>
                    <p className="text-text-secondary">
                        <strong className="font-semibold text-text-primary">Logical Process:</strong> {item.process}
                    </p>
                </div>
            </div>
        </div>
    );
};

const CliCheatsheetTab: React.FC = () => {
    const [openItem, setOpenItem] = useState<string | null>(null);

    const handleToggle = (command: string) => {
        setOpenItem(openItem === command ? null : command);
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold mb-2 text-center text-text-primary">CLI Cheatsheet</h2>
            <p className="text-lg text-text-secondary mb-8 text-center">
                A quick reference for using the CUA Engine command-line interface. Click each command to see its purpose, an example, and the logical process behind it.
            </p>
            <div className="space-y-4">
                {CHEATSHEET_DATA.map((item) => (
                    <AccordionItem 
                        key={item.command} 
                        item={item} 
                        isOpen={openItem === item.command}
                        onClick={() => handleToggle(item.command)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CliCheatsheetTab;