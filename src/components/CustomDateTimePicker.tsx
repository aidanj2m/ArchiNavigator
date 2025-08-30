'use client';

import { useState, useEffect } from 'react';

interface CustomDateTimePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (dateTime: string) => void;
  selectedDateTime?: string;
}

export default function CustomDateTimePicker({ 
  isOpen, 
  onClose, 
  onSelect, 
  selectedDateTime 
}: CustomDateTimePickerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<{ hour: number; minute: number; period: 'AM' | 'PM' }>({ hour: 10, minute: 0, period: 'AM' });

  const getValidHours = (period: 'AM' | 'PM'): number[] => {
    // Business hours: 10am to 11pm
    if (period === 'AM') {
      return [10, 11, 12]; // 10am, 11am, 12pm (noon)
    } else {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // 1pm through 11pm
    }
  };

  useEffect(() => {
    if (selectedDateTime && selectedDateTime !== '') {
      const date = new Date(selectedDateTime);
      setSelectedDate(date);
      setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
      
      let hour = date.getHours();
      const minute = date.getMinutes();
      let period: 'AM' | 'PM' = hour >= 12 ? 'PM' : 'AM';
      
      if (hour === 0) hour = 12;
      else if (hour > 12) hour -= 12;
      
      // Validate that the time is within business hours (10am-11pm)
      const validHours = getValidHours(period);
      if (!validHours.includes(hour)) {
        // If outside business hours, default to 10 AM
        hour = 10;
        period = 'AM';
      }
      
      setSelectedTime({ hour, minute, period });
    }
  }, [selectedDateTime]);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const selectDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    
    if (date >= today) {
      setSelectedDate(date);
    }
  };

  const handleTimeChange = (type: 'hour' | 'minute' | 'period', value: string) => {
    setSelectedTime(prev => {
      const newTime = {
        ...prev,
        [type]: type === 'period' ? value : parseInt(value)
      };
      
      // If period changes, validate and adjust hour if needed
      if (type === 'period') {
        const validHours = getValidHours(value as 'AM' | 'PM');
        if (!validHours.includes(newTime.hour)) {
          newTime.hour = validHours[0]; // Set to first valid hour
        }
      }
      
      return newTime;
    });
  };

  const handleConfirm = () => {
    if (!selectedDate) return;

    let hour = selectedTime.hour;
    if (selectedTime.period === 'PM' && hour !== 12) hour += 12;
    if (selectedTime.period === 'AM' && hour === 12) hour = 0;

    const finalDateTime = new Date(selectedDate);
    finalDateTime.setHours(hour, selectedTime.minute, 0, 0);

    onSelect(finalDateTime.toISOString());
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClear = () => {
    setSelectedDate(null);
    setSelectedTime({ hour: 10, minute: 0, period: 'AM' });
    onSelect('');
    onClose();
  };

  if (!isOpen) return null;

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="datetime-calendar-day empty"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      date.setHours(0, 0, 0, 0);
      
      const isPast = date < today;
      const isSelected = selectedDate && 
        date.getDate() === selectedDate.getDate() && 
        date.getMonth() === selectedDate.getMonth() && 
        date.getFullYear() === selectedDate.getFullYear();
      const isToday = date.getTime() === today.getTime();

      days.push(
        <div
          key={day}
          className={`datetime-calendar-day ${isPast ? 'past' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
          onClick={() => !isPast && selectDate(day)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="datetime-modal" onClick={handleBackdropClick}>
      <div className="datetime-modal-content">
        <div className="datetime-header">
          <h3>Select Date & Time</h3>
        </div>
        
        <div className="datetime-calendar">
          <div className="datetime-calendar-header">
            <button className="datetime-nav-btn" onClick={goToPreviousMonth}>‹</button>
            <div className="datetime-month-year">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </div>
            <button className="datetime-nav-btn" onClick={goToNextMonth}>›</button>
          </div>
          
          <div className="datetime-day-headers">
            {dayNames.map(day => (
              <div key={day} className="datetime-day-header">{day}</div>
            ))}
          </div>
          
          <div className="datetime-calendar-grid">
            {renderCalendarDays()}
          </div>
        </div>

        <div className="datetime-time-picker">
          <div className="datetime-time-label">Time</div>
          <div className="datetime-time-controls">
            <select 
              value={selectedTime.hour} 
              onChange={(e) => handleTimeChange('hour', e.target.value)}
              className="datetime-time-select"
            >
              {getValidHours(selectedTime.period).map(hour => (
                <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}</option>
              ))}
            </select>
            
            <span className="datetime-time-separator">:</span>
            
            <select 
              value={selectedTime.minute} 
              onChange={(e) => handleTimeChange('minute', e.target.value)}
              className="datetime-time-select"
            >
              {Array.from({ length: 4 }, (_, i) => i * 15).map(minute => (
                <option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</option>
              ))}
            </select>
            
            <select 
              value={selectedTime.period} 
              onChange={(e) => handleTimeChange('period', e.target.value)}
              className="datetime-time-select period"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <div className="datetime-actions">
          <button className="datetime-btn secondary" onClick={handleClear}>
            Clear
          </button>
          <button className="datetime-btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="datetime-btn primary" 
            onClick={handleConfirm}
            disabled={!selectedDate}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
