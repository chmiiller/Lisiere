import React, { useState } from 'react';

type LogoSelectProps = {
  onChange: (item: LogoOption) => void;
}

export type LogoOption = {
  name: 'Sony' | 'Nikon' | 'Canon' | 'Leica' | 'Go Pro' | 'Olympus' | 'Apple' | 'Samsung';
  url: string;
};

const LogoOptions: LogoOption[] = [
  { name: 'Sony', url: '/logos/sony.png' },
  { name: 'Nikon', url: '/logos/nikon.png' },
  { name: 'Canon', url: '/logos/canon.png' },
  { name: 'Leica', url: '/logos/leica.png' },
  { name: 'Go Pro', url: '/logos/gopro.png' },
  { name: 'Olympus', url: '/logos/olympus.png' },
  { name: 'Apple', url: '/logos/apple.png' },
  { name: 'Samsung', url: '/logos/samsung.png' },
];

export default function LogoSelect({ onChange }: LogoSelectProps) {
  const [selectedValue, setSelectedValue] = useState<string>("Sony");
  return (
    <div className='flex flex-col'>
      <label
        className='text-slate-200 ml-1 mt-2 mb-1 text-base font-bold'
        htmlFor="logo">
          Camera logo
        </label>
      <select
        id='logo'
        value={selectedValue}
        className='bg-slate-700 p-1 m-1 text-lg max-w-28 rounded-md leading-relaxed'
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const selectedValue = e.currentTarget.value;
          setSelectedValue(selectedValue);
          const item = LogoOptions.find(item => item.url === selectedValue);
          if (item && onChange) {
            onChange(item);
          }
        }}
      >
        {LogoOptions.map((option) => (
            <option
              key={option.name}
              value={option.url}
              title={option.name}
            >
                {option.name}
            </option>
          )
        )}
      </select>
    </div>
  );  
};