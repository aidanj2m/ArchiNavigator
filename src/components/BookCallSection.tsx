'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function BookCallSection() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabaseClient
        .from('contact_requests')
        .insert([{
          name: formData.name,
          email: formData.email,
          type: 'call_booking'
        }]);

      if (error) throw error;

      setSubmittedName(formData.name);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="book-call-section">
      <div className="book-call-content">
        <div className="info-banner">
          <span>BOOK A CALL</span>
        </div>
        <h2>Our Team is Ready<br />to Help You</h2>
        <p>We're here to answer any questions, get personalized support whenever you need.</p>
        <div className="contact-form-container">
          {!isSubmitted ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>In this one-on-one call with us, you'll discover if we fit best with your situation.</h3>
              <p className="form-note">This call is <strong>not</strong> for existing users.</p>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <button type="submit" className="cta-button" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Continue'}
              </button>
            </form>
          ) : (
            <div className="contact-form">
              <div className="thank-you-content">
                <div className="checkmark-circle">
                  <div className="checkmark"></div>
                </div>
                <h3>Thank you, {submittedName}!</h3>
                <p>We'll be in touch with you shortly.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
