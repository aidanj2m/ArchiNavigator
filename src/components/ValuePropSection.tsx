'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ValuePropSectionProps {
  onSignup: () => void;
}

const slides = [
  {
    image: '/IntroductionImage.png',
    title: 'Introduction',
    alt: 'Introduction Phase'
  },
  {
    image: '/TeacherMeetUpImage.png',
    title: 'Meeting with Your Teacher',
    alt: 'Meeting with Your Teacher Phase'
  },
  {
    image: '/FinalReviewImage.png',
    title: 'Final Review',
    alt: 'Final Review Phase'
  },
  {
    image: '/Result Image.png',
    title: 'Result',
    alt: 'Result Phase'
  }
];

export default function ValuePropSection({ onSignup }: ValuePropSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoAdvanceDelay, setAutoAdvanceDelay] = useState(7000);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return; // Don't start timer until section is visible

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setAutoAdvanceDelay(7000); // Reset to normal speed after auto-advance
    }, autoAdvanceDelay);

    return () => clearInterval(timer);
  }, [autoAdvanceDelay, currentSlide, isVisible]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAutoAdvanceDelay(20000); // Wait 20 seconds after manual click
  };

  return (
    <section id="value-prop" ref={sectionRef}>
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
        
        <div className="slideshow-container">
          <div className="slideshow-header">
            <h3 className="slideshow-title">{slides[currentSlide].title}</h3>
            <div className="slide-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="slideshow-wrapper">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
              >
                <div className="slide-image-container">
                  <Image 
                    src={slide.image} 
                    alt={slide.alt}
                    className="slide-image"
                    width={1200}
                    height={600}
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="value-cta-container">
          <button className="cta-button" onClick={onSignup}>Sign up Today!</button>
        </div>
      </div>
    </section>
  );
}
