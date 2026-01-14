'use client';

import Image from 'next/image';

interface HeaderProps {
  onSignup: () => void;
}

export default function Header({ onSignup }: HeaderProps) {
  return (
    <header>
      <nav>
        <div className="logo-container">
          <Image src="/LOGO.png" alt="Logo" className="logo-image" width={30} height={30} />
          <div className="logo-text">ArchiNavigator</div>
        </div>
        <ul className="nav-links">
          <li>
            <span>Join as an <strong>Early</strong> student and collect this offer!</span>
          </li>
        </ul>
        <button className="nav-cta-button" onClick={onSignup}>
          GET STARTED ASAP
        </button>
      </nav>
    </header>
  );
}
