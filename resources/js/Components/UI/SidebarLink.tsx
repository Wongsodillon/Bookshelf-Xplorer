import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function SidebarLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center font-medium leading-5 transition duration-150 ease-in-out focus:outline-none text-gray-400 text-lg ' +
                (active
                    ? 'text-white '
                    : ' hover:text-white ') +
                className
            }
        >
            {children}
        </Link>
    );
}
