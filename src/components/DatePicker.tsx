import { formatDateForPicker } from '@/utils';
import React, { useEffect, useState } from 'react';

type DatePickerProps = {
  onDateChange: (selectedDate: string) => void;
  value?: Date;
};

function DatePicker({ onDateChange, value } :DatePickerProps) {
  const today = formatDateForPicker(new Date());
  const initDate = value ? formatDateForPicker(value) : today;
  const [selectedDate, setSelectedDate] = useState<string>(initDate);
  useEffect(() => {
    if(value) {
      setSelectedDate(formatDateForPicker(value));
    }
  }, [value]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);
  
    if (onDateChange) {
      onDateChange(dateValue);
    }
  };

  return (
    <div className='flex flex-col'>
      <label
          className='text-slate-200 ml-1 mt-2 mb-1 text-base font-bold'
          htmlFor={"timestamp"} >
            Date
        </label>
      <input
        id='timestamp'
        name='timestamp'
        type="date"
        className='bg-slate-700 text-lg p-1 m-1 rounded-md leading-relaxed'
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default DatePicker;