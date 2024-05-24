import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { useState, useEffect } from 'react';
import PrimaryButton from "@/Components/UI/PrimaryButton";
import SecondaryButton from "@/Components/UI/SecondaryButton";
import { List } from "@/types";
import BookPreview from "@/Components/BookPreview";
import { Link } from "@inertiajs/react";
import ProfilePic from "@/Components/ProfilePic";
import { router } from "@inertiajs/react"

type ListsPageProps = PageProps & {
    topPicks: List[];
}

const ListsPage = ({ auth, topPicks }: ListsPageProps) => {

    useEffect(() => console.log(topPicks), [])

    return (
        <MainLayout user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Lists</h2>}
        >
            <div className="py-12 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 items-center">
                        <p className="text-2xl text-gray-500 text-center">Discover, organize, and share. Lists are the perfect way to curate your bookshelf.</p>
                        <SecondaryButton className="max-w-56 py-4" onClick={() => router.visit(`/profile/${auth.user.username}/lists`)}>
                            Start your own list
                        </SecondaryButton>
                    </div>
                    <br />
                    <p className="mb-4 text-xl">Top Picks for you</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {topPicks.map((list, index) => (
                            <div key={index} className="flex-1 flex flex-col gap-2 bg-white shadow-md rounded-lg p-4 min-w-72 hover:-translate-y-2 transition-all duration-200">
                                <Link href={route('lists.details', { id: list.id })}>
                                    <BookPreview books={list.list_details.map(l => l.book)} count={4} className="min-h-36"/>
                                    <h3 className="text-xl font-semibold text-gray-800 mt-2">{list.list_name}</h3>
                                </Link>
                                <Link href={route('profile.user', { username: list.user.username })} className="flex items-center gap-2">
                                    <ProfilePic img={list.user.profile_pic_url} size={8} />
                                    <p>{list.user.name}</p>
                                </Link>
                                <p className="text-gray-500">{list.liked_lists_count} likes</p>
                            </div>
                        ))}
                    </div>

                    {/* Recently created */}
                    {/* Most Saved */}
                </div>
            </div>
        </MainLayout>
    );
}

export default ListsPage;
