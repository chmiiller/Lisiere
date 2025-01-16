import React, { useState } from 'react';

type DatePickerProps = {
  initialDate: string;
  onDateChange: (selectedDate: string) => void
};

function DatePicker({ initialDate, onDateChange } :DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<string>(initialDate || '');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);
  
    if (onDateChange) {
      onDateChange(dateValue);
    }
  };

  return (
    <div>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default DatePicker;