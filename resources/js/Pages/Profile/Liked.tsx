import { PageProps, User } from "@/types";
import ProfileLayout from "./ProfileLayout";
import { Link, usePage } from "@inertiajs/react";
import NavLink from "@/Components/UI/NavLink";
import { PropsWithChildren, ReactNode } from "react";

const Liked = ({ children }: PropsWithChildren<{ children?: ReactNode }>) => {

    const user = usePage<PageProps>().props.user as User;

    return (
        <ProfileLayout>
            <div className="text-gray-500 border-b border-gray-200">
                <ul className="flex flex-wrap -mb-px gap-4">
                    <NavLink href={route('reviews.liked', { username: user.username })} active={route().current('reviews.liked')} className="text-xl font-medium text-gray-500 inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-800 hover:border-gray-300">
                        Reviews
                    </NavLink>
                    <NavLink href={route('lists.liked', { username: user.username })} active={route().current('lists.liked')} className="text-xl font-medium text-gray-500 inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-800 hover:border-gray-300">
                        Lists
                    </NavLink>
                </ul>
            </div>
            <div className="py-4">
                {children}
            </div>
        </ProfileLayout>
    );
}

export default Liked;
