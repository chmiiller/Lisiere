import React from 'react';

type InputTextProps = {
  id: string;
  label?: string;
  limit?: number;
  numeric?: boolean;
  onChange: (value: string) => void;
};

export default function InputText({ id, label, limit, numeric, onChange }: InputTextProps) {
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
        type='text'
        maxLength={limit || undefined}
        onChange={(e) => {
          onChange(e.currentTarget.value);
        }}
      />
    </div>
  );
}