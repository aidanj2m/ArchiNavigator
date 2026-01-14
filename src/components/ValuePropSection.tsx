'use client';

import Image from 'next/image';

interface ValuePropSectionProps {
  onSignup: () => void;
}

export default function ValuePropSection({ onSignup }: ValuePropSectionProps) {
  return (
    <section id="value-prop">
      <div className="value-content">
        <div className="info-banner">
          <span>HOW ARCHINAVIGATOR WORKS</span>
        </div>
        <h2>You Only Pay For The Projects<br />& Get The Education For FREE</h2>
        <p>
          Everyone in college counseling sells you just their guidance for 5,000 to 20,000 dollars. 
          With ArchiNavigator, for a way smaller fee, you get a high quality project + the weekly 
          30-minute sessions (the education) for FREE
        </p>
        <div className="house-image-container">
          <Image 
            src="/thingtohouse.png" 
            alt="Architecture Process" 
            className="house-image"
            width={600}
            height={400}
            priority
          />
        </div>
        <div className="value-cta-container">
          <button className="cta-button" onClick={onSignup}>Sign up Today!</button>
        </div>
      </div>
    </section>
  );
}
