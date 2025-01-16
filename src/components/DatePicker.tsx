import React, { useState } from 'react';

type DatePickerProps = {
  onDateChange: (selectedDate: string) => void
};

function DatePicker({ onDateChange } :DatePickerProps) {
  const today = new Date().toISOString().split('T')[0]; //yyyy-mm-dd
  const [selectedDate, setSelectedDate] = useState<string>(today);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);
  
    if (onDateChange) {
      onDateChange(dateValue);
    }
  };

  return (
    <div>
      <label
          htmlFor={"timestamp"}
          className='text-slate-100 ml-1 mt-2 text-sm font-semibold'>
            Date:
        </label>
      <input
        id='timestamp'
        name='timestamp'
        type="date"
        className='bg-slate-800 text-slate-50 text-base p-1 m-1 rounded-md'
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default DatePicker;