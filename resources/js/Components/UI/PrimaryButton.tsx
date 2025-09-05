import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({ className = '', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={`inline-flex items-center px-4 py-2 bg-light-blue border-2 border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:border-light-blue hover:bg-transparent focus:bg-light-blue-hover active:bg-light-blue-hover focus:outline-none transition ease-in-out duration-200 ${
                disabled && 'opacity-25'
            } ` + className}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
