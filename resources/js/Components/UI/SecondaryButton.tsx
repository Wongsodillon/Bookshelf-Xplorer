import { ButtonHTMLAttributes } from 'react';

export default function SecondaryButton({
  type = 'button',
  className = '',
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const hasCustomHoverBorder = className.includes('hover:border-');

  return (
    <button
      {...props}
      type={type}
      className={`
        inline-flex items-center px-4 py-2 border-2 rounded-md font-semibold text-xs uppercase tracking-widest shadow-sm 
        focus:outline-none disabled:opacity-25 transition ease-in-out duration-150
        border-normal-blue bg-normal-blue
        ${disabled ? 'opacity-25' : ''}
        ${!hasCustomHoverBorder ? 'hover:border-light-blue hover:bg-transparent' : ''}
        ${className}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
