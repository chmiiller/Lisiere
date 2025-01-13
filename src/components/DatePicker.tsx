import React, { useState } from 'react';

function DatePicker({ initialDate, onDateChange, minDate, maxDate}) {
  const [selectedDate, setSelectedDate] = useState(initialDate || '');
  const [error, setError] = useState('');

    const handleDateChange = (e) => {
        const dateValue = e.target.value;
        setSelectedDate(dateValue);
    
        if (onDateChange) {
          onDateChange(dateValue);
        }
    };

    const validateDate = (dateValue) => {
    
        if (!dateValue) {
          setError("Please select a date.");
          return false;
        }
        if (minDate && dateValue < minDate) {
           setError("Selected date is earlier than the minimum date")
            return false;
        }
        if (maxDate && dateValue > maxDate) {
          setError("Selected date is later than the maximum date");
          return false;
        }
    
        setError(''); // Clear the error if it's valid
        return true;
      };
    

    const handleBlur = (e) => {
        const dateValue = e.target.value;
        validateDate(dateValue);
    }
  return (
    <div>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          onBlur={handleBlur}
          min={minDate}
          max={maxDate}
          />
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default DatePicker;