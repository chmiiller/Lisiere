import React from 'react';

type ButtonProps = {
  title?: string;
  onClick: () => void;
  children: React.ReactNode
};
const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  children,
}) => {
  return (
    <div
      data-testid={`button_${title ? title : ''}`}
      className={`
        w-auto p-2 flex flex-row items-center justify-center border-violet-500 rounded-md
        bg-fuchsia-700 hover:bg-fuchsia-800 cursor-pointer max-w-32
      `}
      onClick={onClick}
    >
      {children}
      <p className="ml-1 text-sm">{title}</p>
    </div>
  );
};
export default Button;