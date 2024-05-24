import { useState, PropsWithChildren, ReactNode, FormEventHandler } from 'react';
import ApplicationLogo from '@/Components/UI/ApplicationLogo';
import Dropdown from '@/Components/UI/Dropdown';
import NavLink from '@/Components/UI/NavLink';
import ResponsiveNavLink from '@/Components/UI/ResponsiveNavLink';
import TextInput from '@/Components/UI/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { User } from '@/types';

export default function MainLayout({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

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

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-8 fill-current text-gray-800" />
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
                            <form onSubmit={onSearch} className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex items-center">
                                <TextInput
                                    id="search"
                                    type="search"
                                    name="search"
                                    className="max-h-10"
                                    placeholder='Search...'
                                    autoComplete='false'
                                    onChange={e => setData('search', e.target.value)}
                                />
                            </form>
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
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
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
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
                        <TextInput
                            id="search"
                            type="search"
                            name="search"
                            className="max-h-10 w-full"
                            placeholder='Search...'
                            onChange={e => setData('search', e.target.value)}
                        />
                    </form>
                    <div className='pt-4 pb-1 border-t border-gray-200'>
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

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        {user &&
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">
                                    {user.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">{user.email}</div>
                            </div>
                        }
                        {user ?
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.index')}>Profile</ResponsiveNavLink>
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
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
