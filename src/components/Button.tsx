import React from 'react';

type ButtonProps = {
  title?: string;
  onClick: () => void;
  children: React.ReactNode;
};
const Button: React.FC<ButtonProps> = ({ title, onClick, children }) => (
  <div
    data-testid={`button_${title ? title : ''}`}
    className={`flex w-auto max-w-32 cursor-pointer flex-row items-center justify-center rounded-md border-violet-500 bg-fuchsia-700 p-2 hover:bg-fuchsia-800`}
    onClick={onClick}
  >
    {children}
    <p className="ml-1 text-sm">{title}</p>
  </div>
);
export default Button;
