import React from 'react';
import { Tab } from '../types';

interface TabsProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const tabItems: { id: Tab; label: string }[] = [
  { id: 'concepts', label: 'Core Concepts' },
  { id: 'family', label: 'AI Family' },
  { id: 'workflow', label: 'Building Workflow' },
  { id: 'strategy', label: 'Dual-LLM Strategy' },
  { id: 'cheatsheet', label: 'CLI Cheatsheet' },
  { id: 'auth', label: 'Authentication' },
  { id: 'settings', label: 'Settings' },
];

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="flex justify-center border-b border-background-lighter mb-8 overflow-x-auto">
      {tabItems.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-shrink-0 transition-all duration-300 ease-in-out border-b-2 text-sm sm:text-base md:text-lg font-semibold py-4 px-2 md:px-6 ${
            activeTab === tab.id
              ? 'border-brand-primary text-brand-primary'
              : 'border-transparent text-text-secondary hover:border-brand-primary hover:text-brand-primary'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default Tabs;