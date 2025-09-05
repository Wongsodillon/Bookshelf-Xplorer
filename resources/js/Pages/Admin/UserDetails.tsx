import UserReviewCard from "@/Components/Cards/UserReviewCard";
import DeleteReviewConfirmationModal from "@/Components/Modal/DeleteReviewConfirmationModal";
import ProfilePic from "@/Components/ProfilePic";
import DangerButton from "@/Components/UI/DangerButton";
import AdminLayout from "@/Layouts/AdminLayout";
import { formatDate } from "@/Utils/util";
import { PageProps, Review, UserDetails as User } from "@/types";
import { useState, useEffect } from "react";

type UserDetailsProps = PageProps & {
    user: User;
    reviews: Review[];
}

const UserDetails = ({ auth, user, reviews }: UserDetailsProps) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState<Review | null>(reviews ? reviews[0] : null);

    const onOpen = (review: Review) => {
        setReviewToDelete(review);
        setShowDeleteModal(true);
    }

    const onClose = () => setShowDeleteModal(false)

    return (
        <AdminLayout user={auth.user} header={'User Details'}>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex flex-col gap-6 bg-white p-8 rounded-md max-w-full max-h-96">
                    <div className="flex items-center gap-4">
                        <ProfilePic img={user.profile_pic_url} size={16}/>
                    </div>
                    <div>
                        <p className="font-bold text-xl">{user.name}</p>
                        <p className="text-xl">@{user.username}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Email address</p>
                        <p className="font-bold">{user.email}</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex gap-1 items-center">
                            <p className="text-lg font-bold">{user.following_count}</p>
                            <p>Following</p>
                        </div>
                        <div className="flex gap-1 items-center">
                            <p className="text-lg font-bold">{user.followers_count}</p>
                            <p>Followers</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-6 bg-white p-8 rounded-md w-full">
                    <p className="text-2xl font-bold">General Information</p>
                    <div>
                        <p className="text-gray-500">About me</p>
                        <p className="font-bold">{user.about}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-500">Join date</p>
                            <p className="font-bold">{formatDate(user.created_at)}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Books Read</p>
                            <p className="font-bold">{user.read_books_count} Books</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Books Liked</p>
                            <p className="font-bold">{user.likes_count} Books</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Books in Read List</p>
                            <p className="font-bold">{user.read_list_count} Books</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Books Rated</p>
                            <p className="font-bold">{user.ratings_count} Books Rated</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Lists Created</p>
                            <p className="font-bold">{user.lists_count} Lists</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white p-8 rounded-md">
                <p className="text-2xl font-bold">{user.name}'s Reviews</p>
                <br />
                {reviews.length === 0 && <p className="text-gray-500 text-lg">No reviews found</p>}
                {reviews.length > 0 && <p className="text-gray-500 text-lg mb-4">Total reviews: {reviews.length}</p>}
                {reviews.map(review => (
                    <>
                        <UserReviewCard key={review.id} review={review} admin={true} onOpen={onOpen} />
                        <br />
                    </>
                ))}
            </div>
            <DeleteReviewConfirmationModal onClose={onClose} review={reviewToDelete} show={showDeleteModal}/>
        </AdminLayout>
    );
}

export default UserDetails;
