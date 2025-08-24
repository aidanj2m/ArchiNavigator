'use client';

interface HeroSectionProps {
  onJoinWaitlist: () => void;
}

export default function HeroSection({ onJoinWaitlist }: HeroSectionProps) {
  return (
    <>
      <div className="offer-banner">
        <span>LIMITED TIME OFFER</span>
      </div>
      
      <section id="hero">
        <div className="hero-content">
          <h1>Put Together the <strong>Strongest</strong> College Portfolio</h1>
          <p>Learn the design process of architecture as just a high school student</p>
          <button className="cta-button" onClick={onJoinWaitlist}>Join Waitlist</button>
        </div>
        <div className="cube-container">
          <div className="cube">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face right"></div>
            <div className="face left"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
          <div className="cube-shadow"></div>
        </div>
      </section>
    </>
  );
}
