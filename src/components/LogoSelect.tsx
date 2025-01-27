import React, { useState } from 'react';

type LogoSelectProps = {
  onChange: (value: string) => void;
}

const LogoOptions = [
  {name: 'Sony', url: '/logos/sony.png'},
  {name: 'Nikon', url: '/logos/nikon.png'},
  {name: 'Canon', url: '/logos/canon.png'},
  {name: 'Leica', url: '/logos/leica.png'},
  {name: 'Go Pro', url: '/logos/gopro.png'},
  {name: 'Olympus', url: '/logos/olympus.png'},
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
        onChange={e => {
          setSelectedValue(e.target.value);
          onChange(e.target.value);
        }}
      >
        {LogoOptions.map((option) => {
          return (
            <option key={option.name} value={option.url}>{option.name}</option>
          );
        })}
      </select>
    </div>
  );  
};