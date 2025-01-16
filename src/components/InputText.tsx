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
      {label && <label
        htmlFor={id}
        className='text-violet-50'>
          {label}
      </label>}
      <input
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