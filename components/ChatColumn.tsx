import React from 'react';
import { ChatMessage } from '../types';
import Loader from './Loader';
import CodeSnippet from './CodeSnippet';
import InlineHint from './InlineHint';
import CopyButton from './CopyButton';

interface ChatColumnProps {
  title: string;
  chatHistory: ChatMessage[];
  isLoading: boolean;
  onStartConversation: (prompt: string) => void;
  chatLogRef: React.RefObject<HTMLDivElement>;
}

const ChatColumn: React.FC<ChatColumnProps> = ({ title, chatHistory, isLoading, onStartConversation, chatLogRef }) => {
  return (
    <div className="glass neon p-4 flex flex-col h-[600px] max-h-[70vh]">
      <h3 className="text-xl font-bold text-center text-text-primary mb-4 drop-shadow-[0_0_4px_rgba(138,43,226,0.6)]">{title}</h3>
      <div ref={chatLogRef} className="flex-grow space-y-4 overflow-y-auto p-2 min-h-0">
        {chatHistory.map(msg => (
          <div key={msg.id}>
            <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`relative p-3 rounded-lg max-w-[85%] shadow-md ${msg.sender === 'user' ? 'bg-brand-primary text-white rounded-br-none' : 'bg-background-light text-text-primary rounded-bl-none'}`}>
                <CopyButton textToCopy={msg.code ? `${msg.content}\n\n${msg.code}` : msg.content} />
                <p className="pr-8">{msg.content}</p>
                {msg.code && <CodeSnippet code={msg.code} />}
              </div>
            </div>
            {msg.sender === 'ai' && msg.hints && (
              <InlineHint hints={msg.hints} onStart={onStartConversation} />
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-lg bg-background-light rounded-bl-none shadow-md">
              <Loader />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatColumn;