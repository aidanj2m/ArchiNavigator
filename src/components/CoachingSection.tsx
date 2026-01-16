'use client';

import Image from 'next/image';

const logos = [
  { src: '/YaleLogo.png', alt: 'Yale University' },
  { src: '/PrincetonLogo.png', alt: 'Princeton University' },
  { src: '/RiceLogo.png', alt: 'Rice University' },
  { src: '/CornellLogo.png', alt: 'Cornell University' },
  { src: '/PrattLogo.png', alt: 'Pratt Institute' },
  { src: '/CMULogo.png', alt: 'Carnegie Mellon University' },
  { src: '/RisdLogo.png', alt: 'RISD' },
];

export default function CoachingSection() {
  return (
    <section id="coaching-section">
      <div className="coaching-content">
        <div className="info-banner">
          <span>WHY US</span>
        </div>
        <h2>Learn From the Best</h2>
        <p>
          Have 1:1 PERSONAL coaching from students accepted to TOP architecture institutions. 
          We know how to deliver the highest quality projects and to prepare young students for the 
          college application process.
        </p>
        
        <div className="logo-marquee">
          <div className="logo-marquee-track">
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div key={`logo-1-${index}`} className="logo-item">
                <Image src={logo.src} alt={logo.alt} width={120} height={120} />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, index) => (
              <div key={`logo-2-${index}`} className="logo-item">
                <Image src={logo.src} alt={logo.alt} width={120} height={120} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
