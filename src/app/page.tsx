'use client';

import { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ValuePropSection from '../components/ValuePropSection';
import PortfolioSection from '../components/PortfolioSection';
import CoachingSection from '../components/CoachingSection';
import BookCallSection from '../components/BookCallSection';
import SignupModal from '../components/SignupModal';

export default function Home() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleSignup = () => {
    setIsSignupModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <>
      <Header onSignup={handleSignup} />
      
      <main>
        <HeroSection onSignup={handleSignup} />
        <ValuePropSection onSignup={handleSignup} />
        <PortfolioSection />
        <CoachingSection />
        <BookCallSection />
      </main>

      <footer>
        <p>&copy; 2025 ArchiNavigator. All rights reserved.</p>
      </footer>

      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
}