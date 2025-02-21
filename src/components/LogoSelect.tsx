import React, { useEffect, useState } from 'react';

type LogoSelectProps = {
  onChange: (item: LogoOption) => void;
  value?: string;
};

export type LogoOption = {
  name:
    | 'Sony'
    | 'Nikon'
    | 'Canon'
    | 'Leica'
    | 'Go Pro'
    | 'Olympus'
    | 'Apple'
    | 'Samsung'
    | 'Google';
  url: string;
};

export const LogoOptions: LogoOption[] = [
  { name: 'Sony', url: '/logos/sony.png' },
  { name: 'Nikon', url: '/logos/nikon.png' },
  { name: 'Canon', url: '/logos/canon.png' },
  { name: 'Leica', url: '/logos/leica.png' },
  { name: 'Go Pro', url: '/logos/gopro.png' },
  { name: 'Olympus', url: '/logos/olympus.png' },
  { name: 'Apple', url: '/logos/apple.png' },
  { name: 'Samsung', url: '/logos/samsung.png' },
  { name: 'Google', url: '/logos/google.png' },
];

export default function LogoSelect({ onChange, value }: LogoSelectProps) {
  const [selectedValue, setSelectedValue] = useState<string>(value || '');
  useEffect(() => {
    if (value) {
      const brandLogo = LogoOptions.find(
        (logo) => logo.name.toLowerCase() === value.toLowerCase(),
      );
      if (brandLogo) {
        setSelectedValue(brandLogo.url);
      }
    }
  }, [value]);

  return (
    <div className="flex flex-col">
      <label
        className="mb-1 ml-1 mt-2 text-base font-bold text-slate-200"
        htmlFor="camera logo"
      >
        Camera logo
      </label>
      <select
        id="camera logo"
        name="camera logo"
        value={selectedValue}
        className="m-1 max-w-28 rounded-md bg-slate-700 p-1 text-lg leading-relaxed"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const selectedValue = e.currentTarget.value;
          setSelectedValue(selectedValue);
          const item = LogoOptions.find((item) => item.url === selectedValue);
          if (item && onChange) {
            onChange(item);
          }
        }}
      >
        {LogoOptions.map((option) => (
          <option key={option.name} value={option.url} title={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
