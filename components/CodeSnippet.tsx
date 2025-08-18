import React from 'react';
import CopyButton from './CopyButton';

interface CodeSnippetProps {
  code: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code }) => {
  return (
    <div className="bg-black/50 text-neon-fuchsia rounded-md mt-2 relative font-roboto-mono text-xs sm:text-sm">
      <CopyButton textToCopy={code} />
      <pre className="p-4 pr-12 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeSnippet;