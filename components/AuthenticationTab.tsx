import React from 'react';

// Icon components for visual cues in the guide
const CloudIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5h8.25a3.75 3.75 0 00.375-7.467 4.5 4.5 0 00-8.625-2.062 3.75 3.75 0 00-4.5 6.533z" />
    </svg>
);

const KeyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neon-fuchsia" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
);

const CodeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
);

const UserCheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);

const AuthenticationTab: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold mb-2 text-center text-text-primary">Implementing Google OAuth 2.0</h2>
      <p className="text-lg text-text-secondary mb-8 text-center">
        Secure your application and provide a seamless sign-in experience using Google OAuth 2.0. This guide outlines the steps, which you can orchestrate with your AI agents.
      </p>

      <div className="space-y-6">
        <div className="glass-card p-6 flex flex-col sm:flex-row items-start gap-4">
          <div className="flex-shrink-0 bg-background-light p-3 rounded-full mx-auto sm:mx-0">
            <CloudIcon />
          </div>
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-text-primary">Step 1: Set Up Your Google Cloud Project</h3>
            <p className="text-text-secondary mt-1 mb-4">Before you can use Google OAuth, you need a project in the Google Cloud Console. This project will house your credentials and manage API access.</p>
            <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Go to Google Cloud Console
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
            <div className="mt-4 p-3 bg-brand-primary/10 border-l-4 border-brand-primary rounded-r-md text-sm">
              <p className="font-semibold text-brand-primary">CUA Engine Task:</p>
              <p className="italic text-brand-primary/90">Delegate to LYRA: <code className="font-roboto-mono text-sm bg-background-lighter text-text-primary p-1 rounded ml-1">delegate LYRA "Outline necessary Google Cloud APIs for a web app using Google OAuth 2.0."</code></p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col sm:flex-row items-start gap-4">
            <div className="flex-shrink-0 bg-background-light p-3 rounded-full mx-auto sm:mx-0">
                <KeyIcon />
            </div>
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-text-primary">Step 2: Create OAuth 2.0 Credentials</h3>
                <p className="text-text-secondary mt-1">Once your project is set up, you need to create an "OAuth 2.0 Client ID". This will provide you with a <strong className="text-text-primary">Client ID</strong> and a <strong className="text-text-primary">Client Secret</strong> that your application will use to authenticate.</p>
                <ul className="list-disc list-inside text-text-secondary mt-2 space-y-1">
                    <li>Navigate to "APIs & Services" &rarr; "Credentials".</li>
                    <li>Click "Create Credentials" and select "OAuth client ID".</li>
                    <li>Choose "Web application" as the application type.</li>
                    <li>Add your app's domain to "Authorized JavaScript origins" (e.g., <code className="font-roboto-mono text-xs bg-background-lighter/80 p-1 rounded">http://localhost:3000</code>).</li>
                    <li>Add your callback URL to "Authorized redirect URIs" (e.g., <code className="font-roboto-mono text-xs bg-background-lighter/80 p-1 rounded">http://localhost:3000/auth/google/callback</code>).</li>
                </ul>
                 <div className="mt-4 p-3 bg-neon-fuchsia/10 border-l-4 border-neon-fuchsia rounded-r-md text-sm">
                    <p className="font-semibold text-neon-fuchsia">CUA Engine Task:</p>
                    <p className="italic text-neon-fuchsia/90">Delegate to SOPHIA: <code className="font-roboto-mono text-sm bg-background-lighter text-text-primary p-1 rounded ml-1">delegate SOPHIA "Explain best practices for storing OAuth Client Secrets."</code></p>
                </div>
            </div>
        </div>

        <div className="glass-card p-6 flex flex-col sm:flex-row items-start gap-4">
             <div className="flex-shrink-0 bg-background-light p-3 rounded-full mx-auto sm:mx-0">
                <CodeIcon />
            </div>
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-text-primary">Step 3: Integrate with Your Application</h3>
                <p className="text-text-secondary mt-1 mb-4">With credentials in hand, you can now implement the OAuth flow. This involves a frontend action and a backend endpoint to handle the callback from Google.</p>
                
                <h4 className="font-bold text-lg text-text-primary mt-4">Frontend: The Sign-In Action</h4>
                <p className="text-text-secondary mb-2">Create a link or button that redirects the user to Google's consent screen. The URL will include your Client ID, requested scopes (e.g., email, profile), and the redirect URI.</p>
                <div className="font-roboto-mono text-xs sm:text-sm bg-black/50 text-neon-fuchsia rounded-md mt-2 p-4 overflow-x-auto">
                    <pre><code>{`const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
const params = new URLSearchParams({
  client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
  redirect_uri: 'http://localhost:3000/auth/google/callback',
  response_type: 'code',
  scope: 'openid profile email',
  access_type: 'offline',
});

window.location.href = \`\${googleAuthUrl}?\${params.toString()}\`;`}</code></pre>
                </div>

                <h4 className="font-bold text-lg text-text-primary mt-4">Backend: Handling the Callback</h4>
                <p className="text-text-secondary mb-2">After the user approves, Google redirects them to your callback URI with an authorization <code className="font-roboto-mono text-xs bg-background-lighter/80 p-1 rounded">code</code>. Your server exchanges this code for an access token.</p>
                 <div className="font-roboto-mono text-xs sm:text-sm bg-black/50 text-neon-fuchsia rounded-md mt-2 p-4 overflow-x-auto">
                    <pre><code>{`// Example using Node.js/Express
app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;

  // 1. Exchange authorization code for tokens
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: JSON.stringify({
      code,
      client_id: 'YOUR_CLIENT_ID',
      client_secret: 'YOUR_CLIENT_SECRET',
      redirect_uri: 'http://localhost:3000/auth/google/callback',
      grant_type: 'authorization_code',
    }),
  });
  const tokens = await tokenResponse.json();

  // 2. Use tokens to get user profile info
  const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: \`Bearer \${tokens.access_token}\` },
  });
  const profile = await profileResponse.json();

  // 3. Find/create user in your DB and create a session...
  res.redirect('/dashboard');
});`}</code></pre>
                </div>
            </div>
        </div>

        <div className="glass-card p-6 flex flex-col sm:flex-row items-start gap-4">
             <div className="flex-shrink-0 bg-background-light p-3 rounded-full mx-auto sm:mx-0">
                <UserCheckIcon />
            </div>
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-text-primary">Step 4: Activation and User Session</h3>
                <p className="text-text-secondary mt-1">Once you have the user's information from Google, create a user record in your database. You can then establish a session for them (e.g., using secure, http-only cookies) to keep them logged in as they navigate your application.</p>
                 <div className="mt-4 p-3 bg-neon-cyan/10 border-l-4 border-neon-cyan rounded-r-md text-sm">
                    <p className="font-semibold text-neon-cyan">CUA Engine Orchestration:</p>
                    <p className="italic text-neon-cyan/90">Combine agent skills for a full workflow: <code className="font-roboto-mono text-sm bg-background-lighter text-text-primary p-1 rounded ml-1">orchestrate Add-Google-OAuth</code></p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationTab;