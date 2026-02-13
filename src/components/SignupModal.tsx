'use client';

import { useState, useEffect } from 'react';
import CustomDateTimePicker from './CustomDateTimePicker';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', callDate: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset form when modal closes
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', callDate: '' });
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
      if (!formData.callDate) {
        alert('Please select a preferred call date and time.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/calls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          call_date: new Date(formData.callDate).toISOString(),
          call_type: 'intro'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to schedule intro call');
      }

      const result = await response.json();
      console.log('Intro call scheduled:', result);

      setSubmittedName(formData.name);
      setIsSubmitted(true);
      
      // Auto-close modal after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error scheduling your intro call. Please try again.');
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

  const handleDateTimeSelect = (dateTime: string) => {
    setFormData({
      ...formData,
      callDate: dateTime
    });
  };

  const formatDisplayDate = (dateTime: string) => {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={`signup-modal ${isOpen ? 'active' : ''}`} onClick={handleBackdropClick}>
        <div className="modal-content" key={isOpen ? 'open' : 'closed'}>
          <div className="modal-form">
            {!isSubmitted ? (
              <>
                <h3>Schedule Your Intro Call</h3>
                <p style={{ 
                  fontSize: '0.95rem', 
                  color: '#666', 
                  marginBottom: '1.5rem',
                  lineHeight: '1.5'
                }}>
                  Join ArchiNavigator by scheduling a personalized intro call. We&apos;ll discuss your architecture school goals and how we can help you succeed.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
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
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="callDate"
                      placeholder="Choose Your Preferred Date & Time"
                      value={formatDisplayDate(formData.callDate)}
                      onClick={() => !isSubmitting && setIsDateTimePickerOpen(true)}
                      readOnly
                      required
                      disabled={isSubmitting}
                      style={{ cursor: isSubmitting ? 'default' : 'pointer' }}
                    />
                  </div>
                  <button type="submit" className="cta-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Scheduling...' : 'Schedule Intro Call'}
                  </button>
                </form>
              </>
            ) : (
              <div className="thank-you-content">
                <div className="checkmark-circle">
                  <div className="checkmark"></div>
                </div>
                <h3>Thank you, {submittedName}!</h3>
                <p>Your intro call has been scheduled. Check your email for confirmation details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <CustomDateTimePicker
        isOpen={isDateTimePickerOpen}
        onClose={() => setIsDateTimePickerOpen(false)}
        onSelect={handleDateTimeSelect}
        selectedDateTime={formData.callDate}
      />
    </>
  );
}
