import React from 'react';
import { HintSet } from '../types';
import CodeSnippet from './CodeSnippet';

const SystemIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-fuchsia" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const LightbulbIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

const PlayIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

interface InlineHintProps {
  hints: HintSet;
  onStart: (prompt: string) => void;
}

const InlineHint: React.FC<InlineHintProps> = ({ hints, onStart }) => {
  return (
    <div className="mt-3 ml-4 max-w-[85%] space-y-3">
        {/* User Prompt Suggestion */}
        <div className="p-3 bg-brand-primary/10 border-l-4 border-brand-primary rounded-r-md">
            <p className="font-semibold text-brand-primary flex items-center gap-2 mb-2">{hints.user_prompt_suggestion.title}</p>
            <button
                onClick={() => onStart(hints.user_prompt_suggestion.prompt)}
                className="w-full text-left p-3 bg-brand-primary/20 hover:bg-brand-primary/40 rounded-md transition-colors"
            >
                <div className="flex items-center gap-3 text-brand-primary">
                    <PlayIcon />
                    <span className="flex-1 italic">{hints.user_prompt_suggestion.prompt}</span>
                </div>
            </button>
        </div>

        {/* AI Hint */}
        <div className="p-3 bg-neon-cyan/10 border-l-4 border-neon-cyan rounded-r-md">
            <p className="font-semibold text-neon-cyan flex items-center gap-2 mb-1"><LightbulbIcon/>AI Hint</p>
            <p className="italic text-text-secondary text-sm">{hints.ai_hint.description}</p>
            {hints.ai_hint.code && <CodeSnippet code={hints.ai_hint.code} />}
        </div>

        {/* System Suggestion */}
        <div className="p-3 bg-neon-fuchsia/10 border-l-4 border-neon-fuchsia rounded-r-md">
            <p className="font-semibold text-neon-fuchsia flex items-center gap-2 mb-1"><SystemIcon />System Suggestion</p>
            <p className="italic text-text-secondary text-sm">{hints.system_suggestion.description}</p>
            {hints.system_suggestion.code && <CodeSnippet code={hints.system_suggestion.code} />}
        </div>
    </div>
  );
};

export default InlineHint;