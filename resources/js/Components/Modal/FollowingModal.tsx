import { useState, useEffect } from "react";
import Modal from "../Modal";
import useFetch from "@/Hooks/useFetch";
import { Following, User } from "@/types";
import { router } from "@inertiajs/react"
import { usePage } from "@inertiajs/react";
import ProfilePic from "../ProfilePic";
import PrimaryButton from "../UI/PrimaryButton";

type FollowingModalProps = {
    show: boolean;
    onClose: () => void;
    content:  'Followers' | 'Following'
}

const FollowingModal = ({ show, onClose, content }: FollowingModalProps) => {

    const user = usePage().props.user as User
    const { data, error, loading } = useFetch<User[]>(`/${content.toLowerCase()}/${user.username}`)

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6">
                <p className="text-xl">{content}</p>
                <div className="mt-4">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    {data && data.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-2 border-b">
                            <div className="flex gap-4 items-center">
                                <ProfilePic img={user.profile_pic_url} size={16} />
                                <div className="flex flex-col">
                                    <p>{user.name}</p>
                                    <p>@{user.username}</p>
                                </div>
                            </div>
                            <PrimaryButton onClick={() => router.visit(`/profile/${user.username}`)}>
                                Profile
                            </PrimaryButton>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
}

export default FollowingModal;
