'use client';

import { useState } from 'react';
import { API_BASE_URL } from '../config';
import CustomDateTimePicker from './CustomDateTimePicker';

export default function BookCallSection() {
  const [formData, setFormData] = useState({ name: '', email: '', callDate: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.callDate) {
        alert('Please select a preferred call date and time.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/calls/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          call_date: new Date(formData.callDate).toISOString()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to book call');
      }

      const result = await response.json();
      console.log('Call booking successful:', result);

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

  return (
    <section id="book-call-section">
      <div className="book-call-content">
        <div className="info-banner">
          <span>BOOK A CALL</span>
        </div>
        <h2>Our Team is Ready<br />to Help You</h2>
        <p>We&apos;re here to answer any questions, get personalized support whenever you need.</p>
        <div className="contact-form-container">
          {!isSubmitted ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>In this one-on-one call with us, you&apos;ll discover if we fit best with your situation.</h3>
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
              <div className="form-group">
                <input
                  type="text"
                  name="callDate"
                  placeholder="Choose a Date and Time Here"
                  value={formatDisplayDate(formData.callDate)}
                  onClick={() => setIsDateTimePickerOpen(true)}
                  readOnly
                  required
                  disabled={isSubmitting}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <button type="submit" className="cta-button" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Book Call'}
              </button>
            </form>
          ) : (
            <div className="contact-form">
              <div className="thank-you-content">
                <div className="checkmark-circle">
                  <div className="checkmark"></div>
                </div>
                <h3>Thank you, {submittedName}!</h3>
                <p>We&apos;ll be in touch with you shortly.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <CustomDateTimePicker
        isOpen={isDateTimePickerOpen}
        onClose={() => setIsDateTimePickerOpen(false)}
        onSelect={handleDateTimeSelect}
        selectedDateTime={formData.callDate}
      />
    </section>
  );
}
