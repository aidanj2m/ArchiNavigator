'use client';

import Image from 'next/image';

interface HeaderProps {
  onJoinWaitlist: () => void;
}

export default function Header({ onJoinWaitlist }: HeaderProps) {
  return (
    <header>
      <nav>
        <div className="logo-container">
          <Image src="/LOGO.png" alt="Logo" className="logo-image" width={30} height={30} />
          <div className="logo-text">ArchiNavigator</div>
        </div>
        <ul className="nav-links"></ul>
        <button className="nav-cta-button" onClick={onJoinWaitlist}>
          GET STARTED ASAP
        </button>
      </nav>
    </header>
  );
}
