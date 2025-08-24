'use client';

import Image from 'next/image';

export default function PortfolioSection() {
  return (
    <section id="portfolio-section">
      <div className="portfolio-content">
        <div className="info-banner">
          <span>WHAT'S INCLUDED</span>
        </div>
        <h2>The Best Way To Start<br />Your College Portfolio</h2>
        <p>
          With this program, you can do almost everything wrong and still have a successful 
          portfolio because it removes the obstacles of starting and building an architecture portfolio
        </p>
        <div className="chart-container">
          <Image 
            src="/included chart.png" 
            alt="Program Features Chart" 
            className="chart-image"
            width={800}
            height={600}
            priority
          />
        </div>
      </div>
    </section>
  );
}
