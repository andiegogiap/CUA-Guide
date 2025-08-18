import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 flex flex-col items-center gap-4">
      <a href="/" aria-label="Home" className="brand-link">
        <img
          src="https://andiegogiap.com/assets/aionex-icon-256.png"
          alt="AIONEX"
          width={128}
          height={128}
          style={{ height: '40px', width: 'auto', display: 'block' }}
          loading="eager"
          decoding="async"
        />
      </a>
      <h1 className="text-4xl md:text-5xl font-bold text-brand-primary drop-shadow-[0_0_8px_rgba(138,43,226,0.8)]">
        Guide to the CUA Engine
      </h1>
     
    </header>
  );
};

export default Header;
