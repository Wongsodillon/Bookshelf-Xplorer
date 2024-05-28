import MainLayout from "@/Layouts/MainLayout";
import { Link, usePage } from "@inertiajs/react";
import NavLink from "@/Components/UI/NavLink";
import { PageProps, User } from "@/types";
import { useState, ReactNode, PropsWithChildren, FormEventHandler, useEffect } from "react";
import ResponsiveNavLink from "@/Components/UI/ResponsiveNavLink";
import { useForm } from "@inertiajs/react";
import ProfilePic from "@/Components/ProfilePic";
import { useToast } from "@/Hooks/useToast";
import FollowingModal from "@/Components/Modal/FollowingModal";

const ProfileLayout = ({ children }: PropsWithChildren<{ children: ReactNode }>) => {

    const user = usePage<PageProps>().props.user as User
    const auth = usePage<PageProps>().props.auth.user as User

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [content, setContent] = useState<"Followers" | "Following">('Following')

    const [showFollows, setShowFollows] = useState(false)

    const onCloseFollows = () => setShowFollows(false)

    const onOpenFollowing = () => {
        setShowFollows(true)
        setContent('Following')
    }

    const onOpenFollowers = () => {
        setShowFollows(true)
        setContent('Followers')
    }

    const { post, delete:remove, processing } = useForm({
        id: user.id,
        username: user.username
    });

    const { toast } = useToast()

    const isFollowed = user.followers.find(follower => follower.follower_id === auth.id);

    const unfollow: FormEventHandler = e => {
        e.preventDefault();
        remove(route('unfollow'), {
            preserveScroll: true,
            onSuccess: () => toast(`Unfollowed ${user.username}`)
        });
    }

    const follow: FormEventHandler = e => {
        e.preventDefault();
        post(route('follow'), {
            preserveScroll: true,
            onSuccess: () => toast(`Followed ${user.username}`)
        });
    }

    return (
        <MainLayout user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <div className="py-8 px-4 sm:px-8">
                <div className="max-w-6xl mx-auto py-6 px-6 lg:py-8 lg:px-16 bg-white shadow sm:rounded-lg">
                    <div className="flex sm:flex-row gap-1 flex-col justify-between items-start sm:gap-4 sm:justify-between">
                        <div className="flex items-center gap-4">
                            <ProfilePic img={user.profile_pic_url} size={16} />
                            <div className="flex flex-col cursor-default">
                                <p className="text-lg font-bold sm:text-xl">{user.name}</p>
                                <p className="text-md text-gray-600">@{user.username}</p>
                            </div>
                            {auth.id === user.id ? (
                                <Link href={route("profile.edit")} className="bg-gray-600 py-2 px-3 text-sm border border-transparent rounded-md text-white hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 transition ease-in-out duration-150">Edit Profile</Link>
                            ) : (
                                isFollowed ? (
                                    <form onSubmit={unfollow}>
                                        <button disabled={processing} type="submit" className="bg-gray-600 py-2 px-3 text-sm border border-transparent rounded-md text-white hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 transition ease-in-out duration-150" >Unfollow</button>
                                    </form>
                                ) : (
                                    <form onSubmit={follow}>
                                        <button disabled={processing} type="submit" className="bg-gray-600 py-2 px-3 text-sm border border-transparent rounded-md text-white hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 transition ease-in-out duration-150" >Follow</button>
                                    </form>
                                )
                            )}

                        </div>
                        <div className="flex gap-6 ml-2 my-4 ">
                            <div className="flex gap-1 sm:flex-col items-center">
                                <p className="text-lg font-bold">{user.read_books_count}</p>
                                <p>Books</p>
                            </div>
                            <div onClick={() => onOpenFollowing()} className="flex gap-1 sm:flex-col items-center cursor-pointer">
                                <p className="text-lg font-bold">{user.following_count}</p>
                                <p>Following</p>
                            </div>
                            <div onClick={() => onOpenFollowers()} className="flex gap-1 sm:flex-col items-center cursor-pointer">
                                <p className="text-lg font-bold">{user.followers_count}</p>
                                <p>Followers</p>
                            </div>
                        </div>
                        <FollowingModal content={content} show={showFollows} onClose={onCloseFollows}  />
                    </div>
                    <div className="mb-6">
                        <p className="text-2xl mb-2 font-bold">About me</p>
                        <p>{user.about}</p>
                    </div>
                    <div className="-me-2 flex items-center sm:hidden mb-2">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6 mr-4" stroke="currentColor" fill="none" viewBox="0 0 24 24">
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
                            {showingNavigationDropdown ? 'Close' : 'View Navigation'}
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <div className="hidden sm:-my-px sm:flex">
                            <NavLink href={route('profile.user', { username: user.username })} active={route().current('profile.user')} className="text-xl pb-2">
                                Profile
                            </NavLink>
                        </div>
                        <div className="hidden sm:-my-px sm:flex">
                            <NavLink href={route('profile.books', { username: user.username })} active={route().current('profile.books')} className="text-xl pb-2">
                                Books
                            </NavLink>
                        </div>
                        <div className="hidden sm:-my-px sm:flex">
                            <NavLink href={route('reviews.user', { username: user.username })} active={route().current('reviews.user')} className="text-xl pb-2">
                                Reviews
                            </NavLink>
                        </div>
                        <div className="hidden sm:-my-px sm:flex">
                            <NavLink href={route('readlist.index', { username: user.username })} active={route().current('readlist.index')} className="text-xl pb-2">
                                ReadList
                            </NavLink>
                        </div>
                        <div className="hidden sm:-my-px sm:flex">
                            <NavLink href={route('my-lists.index', { username: user.username })} active={route().current('my-lists.index')} className="text-xl pb-2">
                                Lists
                            </NavLink>
                        </div>
                        <div className="hidden sm:-my-px sm:flex">
                            <NavLink href={route('reviews.liked', { username: user.username })} active={route().current('reviews.liked') || route().current('lists.liked')} className="text-xl pb-2">
                                Liked
                            </NavLink>
                        </div>
                    </div>
                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                        <div className='pt-2 pb-1 border-t border-gray-200'>
                            <div className='mt-3 space-y-2'>
                                <ResponsiveNavLink href={route('profile.user', { username: user.username })} active={route().current('profile.user')}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('profile.books', { username: user.username })} active={route().current('profile.books')}>
                                    Books
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('reviews.user', { username: user.username })} active={route().current('reviews.user')}>
                                    Reviews
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('readlist.index', { username: user.username })} active={route().current('readlist.index')}>
                                    ReadList
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('my-lists.index', { username: user.username })} active={route().current('my-lists.index')}>
                                    Lists
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('reviews.liked', { username: user.username })} active={route().current('reviews.liked') || route().current('lists.liked')}>
                                    Liked
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                    <main className="md:mt-8 mt-4">
                        {children}
                    </main>
                </div>
            </div>
        </MainLayout>
    );
}

export default ProfileLayout;
