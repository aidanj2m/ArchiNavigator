'use client';

import { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ValuePropSection from '../components/ValuePropSection';
import PortfolioSection from '../components/PortfolioSection';
import UltimateSection from '../components/UltimateSection';
import CoachingSection from '../components/CoachingSection';
import BookCallSection from '../components/BookCallSection';
import WaitlistModal from '../components/WaitlistModal';

export default function Home() {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  const handleJoinWaitlist = () => {
    setIsWaitlistModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsWaitlistModalOpen(false);
  };

  return (
    <>
      <Header onJoinWaitlist={handleJoinWaitlist} />
      
      <main>
        <HeroSection onJoinWaitlist={handleJoinWaitlist} />
        <ValuePropSection onJoinWaitlist={handleJoinWaitlist} />
        <PortfolioSection />
        <UltimateSection onJoinWaitlist={handleJoinWaitlist} />
        <CoachingSection />
        <BookCallSection />
      </main>

      <footer>
        <p>&copy; 2025 ArchiNavigator. All rights reserved.</p>
      </footer>

      <WaitlistModal 
        isOpen={isWaitlistModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
}