import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-light-blue text-white focus:border-light-blue '
                    : 'border-transparent text-slate-400 hover:text-white hover:border-light-blue ') +
                className
            }
        >
            {children}
        </Link>
    );
}
