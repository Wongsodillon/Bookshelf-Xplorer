import { useState, PropsWithChildren, ReactNode, FormEventHandler, useRef, useEffect } from 'react';
import ApplicationLogo from '@/Components/UI/ApplicationLogo';
import Dropdown from '@/Components/UI/Dropdown';
import NavLink from '@/Components/UI/NavLink';
import ResponsiveNavLink from '@/Components/UI/ResponsiveNavLink';
import TextInput from '@/Components/UI/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { User } from '@/types';

export default function MainLayout({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
    })

    const onSearch: FormEventHandler = (e) => {
        e.preventDefault()
        if (data.search == '') {
            return;
        }
        setShowingNavigationDropdown(false)
        post(route('search', { search: data.search }))
    }

    useEffect(() => {
        const handleScroll = () => {
            const headerHeight = (headerRef.current?.clientHeight || 0);
            if (window.scrollY > headerHeight) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="min-h-screen bg-black">
            <nav className={`bg-dark-blue border-b border-border z-40 fixed w-full transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-8 w-10 fill-current text-gray-800" />
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-4 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Home
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-4 sm:flex">
                                <NavLink href={route('books.index')} active={route().current('books.index')}>
                                    Books
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-4 sm:flex">
                                <NavLink href={route('lists.index')} active={route().current('lists.index')}>
                                    Lists
                                </NavLink>
                            </div>
                        </div>
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <form onSubmit={onSearch} className="hidden sm:min-w-96 sm:flex items-center">
                                <div className="relative w-full">
                                    <TextInput className="p-2.5 w-full z-20" placeholder="Search..." onChange={e => setData('search', e.target.value)} />
                                    <button type="submit" className="absolute top-0 end-0 py-2.5 px-4 text-sm font-medium h-full text-white bg-light-blue rounded-e-lg border border-border hover:bg-light-blue-hover">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>
                            </form>
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-dark-blue hover:text-slate-400 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user ? user.name : 'Guest'}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        {user ?
                                            <>
                                                <Dropdown.Link href={route('profile.user', { username: user.username })}>Profile</Dropdown.Link>
                                                <Dropdown.Link href={route('profile.edit')}>Settings</Dropdown.Link>
                                                { user.role == 'admin' &&
                                                    <Dropdown.Link href={route('admin.dashboard')}>Admin</Dropdown.Link>
                                                }
                                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                                    Log Out
                                                </Dropdown.Link>
                                            </> :
                                            <>
                                                <Dropdown.Link href={route('login')}>Login</Dropdown.Link>
                                                <Dropdown.Link href={route('register')}>Register</Dropdown.Link>
                                            </>
                                        }
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-light-blue focus:outline-none focus:bg-light-blue focus:text-white transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <form className="py-2 px-4" onSubmit={onSearch}>
                        <div className="relative w-full">
                            <input className="block p-2.5 w-full z-20 text-sm text-gray-900 rounded-e-lg rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." onChange={e => setData('search', e.target.value)} />
                            <button type="submit" className="absolute top-0 end-0 py-2.5 px-4 text-sm font-medium h-full text-white bg-light-blue rounded-e-lg border">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </form>
                    <div className='pt-4 pb-1 border-t border-dark-blue-secondary'>
                        <div className='mt-3 space-y-2'>
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Home
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('books.index')} active={route().current('books.index')}>
                                Books
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('lists.index')} active={route().current('lists.index')}>
                                Lists
                            </ResponsiveNavLink>
                        </div>
                    </div>

                    <div className="pt-4 pb-1 border-t border-dark-blue-secondary">
                        {user &&
                            <div className="px-4">
                                <div className="font-medium text-base text-white">
                                    {user.name}
                                </div>
                                <div className="font-medium text-sm text-slate-400">{user.email}</div>
                            </div>
                        }
                        {user ?
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.user', { username: user.username })}>Profile</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('profile.edit')}>Settings</ResponsiveNavLink>
                                { user.role === 'admin' && <ResponsiveNavLink href={route('admin.dashboard')}>Admin</ResponsiveNavLink>}
                                <ResponsiveNavLink href={route('logout')} method="post" as="button">
                                    Logout
                                </ResponsiveNavLink>
                            </div> :
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('login')}>Login</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('register')}>
                                    Register
                                </ResponsiveNavLink>
                            </div>
                        }
                    </div>
                </div>
            </nav>
            {header && (
                <header ref={headerRef} className="bg-dark-blue shadow pt-16">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}


            <main className={`${header ? '' : 'pt-16'}`}>{children}</main>
        </div>
    );
}
