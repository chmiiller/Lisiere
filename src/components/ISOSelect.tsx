import React from 'react';

type ISOSelectProps = {
  onChange: (value: number) => void;
}

const ISOOptions = [
  "50",
  "100",
  "150",
  "200",
  "400",
  "800",
  "1600",
  "3200",
  "6400",
  "12800",
  "25600",
  "51200",
  "102400",
];

export default function ISOSelect({ onChange }: ISOSelectProps) {
  return (
    <div>
      <label htmlFor="iso" className='text-violet-50'>ISO:</label>
      <select
        value={50}
        onChange={e => onChange(parseInt(e.target.value))}
      >
        {ISOOptions.map((option) => {
          return (
            <option key={option} value={option}>{`ISO ${option}`}</option>
          );
        })}
      </select>
    </div>
  );  
};