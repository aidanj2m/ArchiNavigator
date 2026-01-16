'use client';

import Image from 'next/image';

interface HeroSectionProps {
  onSignup: () => void;
}

export default function HeroSection({ onSignup }: HeroSectionProps) {
  return (
    <>
      <div className="offer-banner">
        <span>BUILD YOUR PORTFOLIO</span>
      </div>
      
      <section id="hero">
        <div className="hero-content">
          <h1>Piece Together the <strong>Strongest</strong> College Portfolio</h1>
          <p>Learn the design process of an architect as a high school student</p>
        </div>
        <div className="hero-image-container">
          <Image 
            src="/thingtohouse.png" 
            alt="Architecture Portfolio Building Process" 
            className="hero-house-image"
            width={600}
            height={400}
            priority
          />
        </div>
      </section>
    </>
  );
}
