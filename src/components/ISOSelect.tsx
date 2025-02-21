import React, { useEffect, useState } from 'react';

type ISOSelectProps = {
  onChange: (value: number) => void;
  value?: number;
};

export const ISOOptions = [
  50, 100, 150, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200, 102400,
];

export default function ISOSelect({ onChange, value }: ISOSelectProps) {
  const [selectedValue, setSelectedValue] = useState<number>(value || 50);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

  return (
    <div className="flex flex-col">
      <label
        className="mb-1 ml-1 text-base font-bold text-slate-200"
        htmlFor="ISO select"
      >
        ISO
      </label>
      <select
        id="ISO select"
        name="ISO select"
        value={selectedValue}
        className="m-1 w-24 rounded-md bg-slate-700 p-1 text-lg leading-relaxed"
        onChange={(e) => {
          setSelectedValue(parseInt(e.target.value));
          onChange(parseInt(e.target.value));
        }}
      >
        {ISOOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
