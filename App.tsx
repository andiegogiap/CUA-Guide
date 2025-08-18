
import React, { useState } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import CoreConceptsTab from './components/CoreConceptsTab';
import AiFamilyTab from './components/AiFamilyTab';
import BuildingWorkflowTab from './components/BuildingWorkflowTab';
import DualLlmStrategyTab from './components/DualLlmStrategyTab';
import CliCheatsheetTab from './components/CliCheatsheetTab';
import AuthenticationTab from './components/AuthenticationTab';
import SettingsTab from './components/SettingsTab';
import { Tab } from './types';
import Footer from './components/Footer';
import CustomInstructionsPanel from './components/CustomInstructionsPanel';
import { DEFAULT_SYSTEM_INSTRUCTION, DEFAULT_AI_INSTRUCTION } from './constants/instructions';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('family');
  const [systemInstruction, setSystemInstruction] = useState<string>(DEFAULT_SYSTEM_INSTRUCTION);
  const [aiInstruction, setAiInstruction] = useState<string>(DEFAULT_AI_INSTRUCTION);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'concepts':
        return <CoreConceptsTab />;
      case 'family':
        return <AiFamilyTab systemInstruction={systemInstruction} aiInstruction={aiInstruction} />;
      case 'workflow':
        return <BuildingWorkflowTab />;
      case 'strategy':
        return <DualLlmStrategyTab />;
      case 'auth':
        return <AuthenticationTab />;
      case 'cheatsheet':
        return <CliCheatsheetTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 flex flex-col min-h-screen bg-background-dark text-text-primary">
      <Header />
       <CustomInstructionsPanel
        systemInstruction={systemInstruction}
        aiInstruction={aiInstruction}
        setSystemInstruction={setSystemInstruction}
        setAiInstruction={setAiInstruction}
      />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="mt-8 flex-grow">
        {renderTabContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;