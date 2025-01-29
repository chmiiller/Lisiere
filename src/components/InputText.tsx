import React, { useEffect, useState } from 'react';

type InputTextProps = {
  id: string;
  label?: string;
  limit?: number;
  numeric?: boolean;
  value?: string;
  onChange: (value: string) => void;
};

export default function InputText({ id, label, limit, numeric, value, onChange }: InputTextProps) {
  const [ inputValue, setInputValue ] = useState<string>(value || '');
  useEffect(() => {
    if(value) {
      setInputValue(value);
    }
  }, [value]);

  return (
    <div className='flex flex-col'>
      {label && (
        <label
          htmlFor={id}
          className='text-slate-200 ml-1 mt-2 mb-1 text-base font-bold'>
            {label}
        </label>
      )}
      <input
        className='bg-slate-700 text-base p-1 m-1 w-20 rounded-md leading-relaxed'
        inputMode={numeric ? "decimal" : "text"}
        id={id}
        name={id}
        value={inputValue}
        type='text'
        maxLength={limit || undefined}
        onChange={(e) => {
          setInputValue(e.currentTarget.value);
          onChange(e.currentTarget.value);
        }}
      />
    </div>
  );
}