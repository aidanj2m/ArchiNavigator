'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [formData, setFormData] = useState({ fullName: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset form when modal closes
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ fullName: '', email: '' });
      }, 300);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabaseClient
        .from('waitlist')
        .insert([{
          name: formData.fullName,
          email: formData.email
        }]);

      if (error) throw error;

      setSubmittedName(formData.fullName);
      setIsSubmitted(true);
      
      // Auto-close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error joining the waitlist. Please try again.');
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`waitlist-modal ${isOpen ? 'active' : ''}`} onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-form">
          {!isSubmitted ? (
            <>
              <h3>Enter your details to join the Waitlist</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <button type="submit" className="cta-button" disabled={isSubmitting}>
                  {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                </button>
              </form>
            </>
          ) : (
            <div className="thank-you-content">
              <div className="checkmark-circle">
                <div className="checkmark"></div>
              </div>
              <h3>Thank you, {submittedName}!</h3>
              <p>You&apos;ve been added to the waitlist.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
