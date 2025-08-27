'use client';

import Image from 'next/image';

export default function CoachingSection() {
  return (
    <section id="coaching-section">
      {/* Floating logos */}
      <div className="floating-logos">
        <div className="logo-left logo-1">
          <Image src="/YaleLogo.png" alt="Yale University" width={106} height={106} />
        </div>
        <div className="logo-right logo-2">
          <Image src="/PrincetonLogo.png" alt="Princeton University" width={106} height={106} />
        </div>
        <div className="logo-left logo-3">
          <Image src="/RiceLogo.png" alt="Rice University" width={106} height={106} />
        </div>
        <div className="logo-right logo-4">
          <Image src="/CornellLogo.png" alt="Cornell University" width={106} height={106} />
        </div>
        <div className="logo-left logo-5">
          <Image src="/PrattLogo.png" alt="Pratt Institute" width={106} height={106} />
        </div>
        <div className="logo-right logo-6">
          <Image src="/CMULogo.png" alt="Carnegie Mellon University" width={106} height={106} />
        </div>
        <div className="logo-left logo-7">
          <Image src="/RisdLogo.png" alt="RISD" width={106} height={106} />
        </div>
      </div>

      <div className="coaching-content">
        <div className="info-banner">
          <span>WHY US</span>
        </div>
        <h2>Learn From the Best</h2>
        <p>
          Have 1:1 PERSONAL coaching from students accepted to the TOP architecture school in the WORLD. 
          We know how to deliver the highest quality projects and to prepare young students for the 
          college application process.
        </p>
      </div>
    </section>
  );
}
