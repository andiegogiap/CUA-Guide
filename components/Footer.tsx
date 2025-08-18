import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center p-4 mt-16 border-t border-background-lighter">
      <p className="text-sm text-text-secondary">
        Powered by the <span className="font-bold text-brand-primary drop-shadow-[0_0_4px_rgba(138,43,226,0.6)]">CUA Engine</span> | An Interactive Experience for the Merge Collective
      </p>
    </footer>
  );
};

export default Footer;