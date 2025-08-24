'use client';

import Image from 'next/image';

interface UltimateSectionProps {
  onJoinWaitlist: () => void;
}

export default function UltimateSection({ onJoinWaitlist }: UltimateSectionProps) {
  return (
    <section id="ultimate-section">
      <div className="ultimate-content">
        <h2>The Ultimate Portfolio<br />Building Program</h2>
        <p>
          Get everything you need to build your portfolio before colleges see - no matter whether 
          that is soon or you are starting from scratch.
        </p>
        <div className="service-chart-container">
          <Image 
            src="/ServiceChart.png" 
            alt="Service Details Chart" 
            className="service-chart-image"
            width={800}
            height={600}
            priority
          />
        </div>
        <div className="ultimate-cta-container">
          <button className="cta-button" onClick={onJoinWaitlist}>Join Waitlist</button>
        </div>
      </div>
    </section>
  );
}
