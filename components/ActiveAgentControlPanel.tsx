import React, { useState, useEffect, useRef } from 'react';
import { Agent, ChatMessage, HintSet, OrchestrationStep as OrchestrationStepType } from '../types';
import { getChatResponse, createOrchestrationPlan } from '../services/geminiService';
import { getOpenAIChatResponse } from '../services/openaiService';
import Loader from './Loader';
import OrchestrationStep from './OrchestrationStep';
import ChatColumn from './ChatColumn';

// Icon Components
const ArrowLeftIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);

interface ActiveAgentControlPanelProps {
  agent: Agent;
  onBack: () => void;
  systemInstruction: string;
  aiInstruction: string;
}

const ActiveAgentControlPanel: React.FC<ActiveAgentControlPanelProps> = ({ agent, onBack, systemInstruction, aiInstruction }) => {
  const [geminiChatHistory, setGeminiChatHistory] = useState<ChatMessage[]>([]);
  const [openaiChatHistory, setOpenaiChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);
  const [isOpenAILoading, setIsOpenAILoading] = useState(false);
  const [isPlanLoading, setIsPlanLoading] = useState(false);
  const [orchestrationGoal, setOrchestrationGoal] = useState('');
  const [orchestrationPlan, setOrchestrationPlan] = useState<OrchestrationStepType[] | null>(null);
  
  const geminiChatLogRef = useRef<HTMLDivElement>(null);
  const openaiChatLogRef = useRef<HTMLDivElement>(null);

  const addMessage = (setter: React.Dispatch<React.SetStateAction<ChatMessage[]>>, sender: 'user' | 'ai', content: string, code?: string, hints?: HintSet) => {
    setter(prev => [...prev, { id: crypto.randomUUID(), sender, content, code, hints }]);
  };

  useEffect(() => {
    const greeting = `Hello! I'm ${agent.name}, ${agent.role}. My philosophy is "${agent.philosophy}". How can I help you achieve your goals today?`;
    addMessage(setGeminiChatHistory, 'ai', greeting);
    addMessage(setOpenaiChatHistory, 'ai', greeting);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent]);
  
  useEffect(() => {
    geminiChatLogRef.current?.scrollTo({ top: geminiChatLogRef.current.scrollHeight, behavior: 'smooth' });
  }, [geminiChatHistory]);

  useEffect(() => {
    openaiChatLogRef.current?.scrollTo({ top: openaiChatLogRef.current.scrollHeight, behavior: 'smooth' });
  }, [openaiChatHistory]);


  const submitGeminiPrompt = async (prompt: string): Promise<boolean> => {
    if (!prompt) return false;
    
    addMessage(setGeminiChatHistory, 'user', prompt);
    setIsGeminiLoading(true);

    const res = await getChatResponse(agent, prompt, geminiChatHistory, systemInstruction, aiInstruction);
    
    setIsGeminiLoading(false);

    if (res.success === true) {
      addMessage(setGeminiChatHistory, 'ai', res.data.text, res.data.code, res.data);
      return true;
    } else {
      addMessage(setGeminiChatHistory, 'ai', `I apologize, but I encountered an error: ${res.error}`);
      return false;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput) return;

    const currentInput = userInput;
    setUserInput('');

    // Add user message to both logs
    addMessage(setGeminiChatHistory, 'user', currentInput);
    addMessage(setOpenaiChatHistory, 'user', currentInput);

    // Set loading states
    setIsGeminiLoading(true);
    setIsOpenAILoading(true);

    // Trigger both API calls in parallel
    const geminiPromise = getChatResponse(agent, currentInput, geminiChatHistory, systemInstruction, aiInstruction);
    const openaiPromise = getOpenAIChatResponse(agent, currentInput, openaiChatHistory, systemInstruction, aiInstruction);

    const [geminiResult, openaiResult] = await Promise.allSettled([geminiPromise, openaiPromise]);

    // Handle Gemini response
    setIsGeminiLoading(false);
    if (geminiResult.status === 'fulfilled') {
        const res = geminiResult.value;
        if (res.success === true) {
            addMessage(setGeminiChatHistory, 'ai', res.data.text, res.data.code, res.data);
        } else {
            addMessage(setGeminiChatHistory, 'ai', `I apologize, but I encountered an error: ${res.error}`);
        }
    } else {
        addMessage(setGeminiChatHistory, 'ai', `I apologize, but I encountered an error: A network error occurred.`);
    }

    // Handle OpenAI response
    setIsOpenAILoading(false);
    if (openaiResult.status === 'fulfilled') {
        const res = openaiResult.value;
        if (res.success === true) {
            addMessage(setOpenaiChatHistory, 'ai', res.data.text, res.data.code, res.data);
        } else {
            addMessage(setOpenaiChatHistory, 'ai', `I apologize, but I encountered an error: ${res.error}`);
        }
    } else {
        addMessage(setOpenaiChatHistory, 'ai', `I apologize, but I encountered an error: A network error occurred.`);
    }
  };

  const handlePlanOrchestration = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!orchestrationGoal) return;

      setIsPlanLoading(true);
      setOrchestrationPlan(null);

      // Add message to Gemini log since it's the orchestrator
      addMessage(setGeminiChatHistory, 'ai', `Creating an orchestration plan for: "${orchestrationGoal}"...`);

      const res = await createOrchestrationPlan(agent, orchestrationGoal);
      setIsPlanLoading(false);
      
      if (res.success === true) {
        if (res.data.plan && res.data.plan.length > 0) {
          const initialPlan: OrchestrationStepType[] = res.data.plan.map(step => ({ ...step, status: 'pending' }));
          initialPlan[0].status = 'active';
          setOrchestrationPlan(initialPlan);
          addMessage(setGeminiChatHistory, 'ai', `I have created a ${initialPlan.length}-step plan to achieve your goal. Review the plan below and execute the first step when you're ready.`);
        } else {
            addMessage(setGeminiChatHistory, 'ai', `I couldn't create a plan for that. Error: The plan was empty.`);
        }
      } else {
        addMessage(setGeminiChatHistory, 'ai', `I couldn't create a plan for that. Error: ${res.error}`);
      }
  };

  const handleExecuteStep = async (prompt: string, stepNumber: number) => {
    const success = await submitGeminiPrompt(prompt);
    
    if (success) {
      setOrchestrationPlan(prevPlan => {
          if (!prevPlan) return null;
          const newPlan = [...prevPlan];
          const currentIndex = newPlan.findIndex(s => s.step === stepNumber);

          if (currentIndex !== -1) {
              newPlan[currentIndex].status = 'completed';
              if (currentIndex + 1 < newPlan.length) {
                  newPlan[currentIndex + 1].status = 'active';
              }
          }
          return newPlan;
      });
    }
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-colors mb-4 font-semibold">
        <ArrowLeftIcon />
        Back to AI Family
      </button>

      {/* Agent Summary Card */}
      <div className="glass neon p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 text-center">
            <div className="w-24 h-24 rounded-full bg-background-light flex items-center justify-center mx-auto border-2 border-brand-primary shadow-neon-violet">
              <span className="text-4xl font-bold text-brand-primary drop-shadow-[0_0_4px_rgba(138,43,226,0.6)]">{agent.name.charAt(0)}</span>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mt-2">{agent.name}</h2>
            <p className="text-brand-primary font-semibold">{agent.role}</p>
          </div>
          <div className="flex-grow">
            <p className="italic text-text-primary border-l-4 border-neon-fuchsia pl-4">"{agent.philosophy}"</p>
            <h4 className="text-lg font-semibold mt-4 mb-2 text-text-primary">Primary Focus Areas:</h4>
            <div className="flex flex-wrap gap-2">
              {agent.focus_areas.map(area => (
                <span key={area} className="bg-background-lighter text-text-primary text-xs font-medium px-2.5 py-1 rounded-full">{area}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Orchestration Planner */}
      <div className="glass neon p-4 mb-6">
          <h3 className="font-bold text-lg text-text-primary mb-2">Orchestration Planner</h3>
          <form onSubmit={handlePlanOrchestration} className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                type="text"
                value={orchestrationGoal}
                onChange={(e) => setOrchestrationGoal(e.target.value)}
                className="flex-grow bg-background-light border border-background-lighter rounded-lg p-3 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                placeholder="Enter a high-level goal..."
                required
                autoComplete="off"
                disabled={isPlanLoading}
              />
              <button type="submit" disabled={isPlanLoading || !orchestrationGoal} className="bg-brand-primary hover:bg-brand-secondary disabled:bg-background-lighter disabled:text-text-secondary text-white font-bold p-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-neon-violet disabled:shadow-none">
                {isPlanLoading ? <Loader /> : 'Plan Orchestration'}
              </button>
          </form>
          {orchestrationPlan && (
              <div className="space-y-2">
                  {orchestrationPlan.map(step => (
                      <OrchestrationStep key={step.step} step={step} onExecute={handleExecuteStep} />
                  ))}
              </div>
          )}
      </div>

      {/* Dual Chat Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChatColumn 
            title="Gemini Inference"
            chatHistory={geminiChatHistory}
            isLoading={isGeminiLoading}
            onStartConversation={submitGeminiPrompt}
            chatLogRef={geminiChatLogRef}
          />
          <ChatColumn 
            title="OpenAI Inference"
            chatHistory={openaiChatHistory}
            isLoading={isOpenAILoading}
            onStartConversation={(prompt) => {
                setUserInput(prompt);
                // Future: could trigger a specific OpenAI call here if needed
            }}
            chatLogRef={openaiChatLogRef}
          />
      </div>

      {/* Combined User Input Form */}
       <form onSubmit={handleFormSubmit} className="flex gap-2 flex-shrink-0 mt-4 sticky bottom-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-grow bg-background-light/80 backdrop-blur-sm border border-background-lighter rounded-lg p-3 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary shadow-lg"
            placeholder="Ask a question or provide a task to both models..."
            required
            autoComplete="off"
            disabled={isGeminiLoading || isOpenAILoading}
          />
          <button type="submit" disabled={isGeminiLoading || isOpenAILoading || !userInput} className="bg-brand-primary hover:bg-brand-secondary disabled:bg-background-lighter text-white font-bold p-3 rounded-lg flex items-center justify-center w-24 transition-all shadow-lg hover:shadow-neon-violet disabled:shadow-none disabled:text-text-secondary">
            {(isGeminiLoading || isOpenAILoading) ? <Loader /> : <SendIcon/>}
          </button>
      </form>
    </div>
  );
};

export default ActiveAgentControlPanel;