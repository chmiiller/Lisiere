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
    <div className='flex flex-col'>
      <label
        className='text-slate-200 ml-1 mb-1 text-base font-bold'
        htmlFor="iso">
          ISO
        </label>
      <select
        value={selectedValue}
        className='bg-slate-700 p-1 m-1 text-lg w-24 rounded-md leading-relaxed'
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