import React from 'react';

type InputTextProps = {
  id: string;
  label?: string;
  limit?: number;
  onChange: (value: string) => void;
};

export default function InputText({ id, label, limit, onChange }: InputTextProps) {
  return (
    <div className='flex flex-col'>
      {label && (
        <label
          htmlFor={id}
          className='text-slate-100 ml-1 mt-2 text-sm font-semibold'>
            {label}
        </label>
      )}
      <input
        className='bg-slate-800 text-base p-1 m-1 w-20 rounded-md'
        id={id}
        name={id}
        type='text'
        maxLength={limit || undefined}
        onChange={(e) => {
          onChange(e.currentTarget.value);
        }}
      />
    </div>
  );
}