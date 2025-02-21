import React, { useEffect, useState } from 'react';

type InputTextProps = {
  id: string;
  label?: string;
  limit?: number;
  numeric?: boolean;
  value?: string;
  onChange: (value: string) => void;
};

export default function InputText({
  id,
  label,
  limit,
  numeric,
  value,
  onChange,
}: InputTextProps) {
  const [inputValue, setInputValue] = useState<string>(value || '');
  useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value]);

  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 ml-1 mt-2 text-base font-bold text-slate-200"
        >
          {label}
        </label>
      )}
      <input
        className="m-1 min-w-1 max-w-60 rounded-md bg-slate-700 p-1 text-base leading-relaxed"
        inputMode={numeric ? 'decimal' : 'text'}
        id={id}
        name={id}
        value={inputValue}
        type="text"
        maxLength={limit || undefined}
        onChange={(e) => {
          setInputValue(e.currentTarget.value);
          onChange(e.currentTarget.value);
        }}
      />
    </div>
  );
}
