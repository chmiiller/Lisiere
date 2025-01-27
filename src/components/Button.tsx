type ButtonProps = {
  title?: string;
  outline?: boolean;
  onClick: () => void;
  children: React.ReactNode
};
const Button: React.FC<ButtonProps> = ({
  title,
  outline,
  onClick,
  children,
}) => {
  return (
    <div
      className={`
        w-auto p-2 flex flex-row items-center justify-center
        ${outline ? 'border' : ''} border-violet-500 rounded-md
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