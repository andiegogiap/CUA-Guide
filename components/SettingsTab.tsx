import React from 'react';

const ShieldIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);

const SettingsTab: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold mb-2 text-center text-text-primary">API Key Configuration</h2>
            <p className="text-lg text-text-secondary mb-8 text-center">
                This application is configured to securely access generative AI models.
            </p>

            <div className="glass neon p-6">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="flex-shrink-0 bg-background-light p-3 rounded-full mx-auto sm:mx-0">
                        <ShieldIcon />
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-xl font-bold text-text-primary">Secure by Design</h3>
                        <p className="text-text-secondary mt-1 mb-4">
                            For your security, API keys are not managed through the user interface. They must be configured as environment variables in the execution environment where this application is running.
                        </p>
                        <ul className="space-y-4">
                            <li>
                                <h4 className="font-semibold text-lg text-text-primary">Google Gemini API Key</h4>
                                <p className="text-text-secondary">The application expects the Google Gemini API key to be available as an environment variable named:</p>
                                <code className="font-roboto-mono text-sm bg-brand-primary/20 text-brand-primary p-2 rounded mt-2 inline-block">API_KEY</code>
                            </li>
                            <li>
                                <h4 className="font-semibold text-lg text-text-primary">OpenAI API Key</h4>
                                <p className="text-text-secondary">For the dual-chat functionality, the application expects the OpenAI API key to be available as an environment variable named:</p>
                                <code className="font-roboto-mono text-sm bg-neon-fuchsia/20 text-neon-fuchsia p-2 rounded mt-2 inline-block">OPENAI_API_KEY</code>
                            </li>
                        </ul>
                         <p className="text-text-secondary/70 mt-6 text-sm">
                            Please ensure these variables are set in your deployment configuration. The application will automatically use them to power the AI features. There is no need to enter them manually.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsTab;