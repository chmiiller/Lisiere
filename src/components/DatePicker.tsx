import React, { useEffect, useState } from 'react';

import { formatDateForPicker } from '@/utils';

type DatePickerProps = {
  onDateChange: (selectedDate: string) => void;
  value?: Date;
};

function DatePicker({ onDateChange, value }: DatePickerProps) {
  const today = formatDateForPicker(new Date());
  const initDate = value ? formatDateForPicker(value) : today;
  const [selectedDate, setSelectedDate] = useState<string>(initDate);
  useEffect(() => {
    if (value) {
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
    <div className="flex max-w-48 flex-col">
      <label
        className="mb-1 ml-1 mt-2 text-base font-bold text-slate-200"
        htmlFor={'timestamp'}
      >
        Date
      </label>
      <input
        id="timestamp"
        name="timestamp"
        type="date"
        className="m-1 rounded-md bg-slate-700 p-1 text-lg leading-relaxed"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default DatePicker;
