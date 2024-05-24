import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function SidebarButton({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'flex items-center p-2 gap-2 cursor-pointer duration-200 ease-linear rounded-md mb-4 hover:bg-gray-700 hover:text-white ' +
                (active
                    ? ' bg-gray-700 text-white'
                    : ' ') +
                className
            }
        >
            {children}
        </Link>
    );
}
