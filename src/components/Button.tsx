import React from 'react';

type ButtonProps = {
  title?: string;
  onClick: () => void;
  children: React.ReactNode;
  enabled?: boolean;
};
const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  children,
  enabled = true,
}) => (
  <div
    data-testid={`button_${title ? title : ''}`}
    className={`flex w-auto max-w-32 ${enabled ? 'cursor-pointer' : 'cursor-not-allowed'} flex-row items-center justify-center rounded-md border-violet-500 ${enabled ? 'bg-fuchsia-700' : 'bg-gray-400'} ${enabled ? 'hover:bg-fuchsia-800' : 'hover:bg-gray-500'} p-2`}
    onClick={() => {
      if (enabled) {
        onClick();
      }
    }}
  >
    {children}
    <p className="ml-1 text-sm">{title}</p>
  </div>
);
export default Button;
