import React, { useState } from 'react';

type ISOSelectProps = {
  onChange: (value: number) => void;
}

const ISOOptions = [
  50,
  100,
  150,
  200,
  400,
  800,
  1600,
  3200,
  6400,
  12800,
  25600,
  51200,
  102400,
];

export default function ISOSelect({ onChange }: ISOSelectProps) {
  const [selectedValue, setSelectedValue] = useState<number>(50);
  return (
    <div>
      <label
        className='text-slate-100 ml-1 mt-2 text-sm font-semibold'
        htmlFor="iso">
          ISO:
        </label>
      <select
        value={selectedValue}
        className='bg-slate-800 text-sm p-1 m-1 rounded-md'
        onChange={e => {
          setSelectedValue(parseInt(e.target.value));
          onChange(parseInt(e.target.value));
        }}
      >
        {ISOOptions.map((option) => {
          return (
            <option key={option} value={option}>{option}</option>
          );
        })}
      </select>
    </div>
  );  
};