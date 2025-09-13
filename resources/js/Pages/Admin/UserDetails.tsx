import UserReviewCard from "@/Components/Cards/UserReviewCard";
import DeleteReviewConfirmationModal from "@/Components/Modal/DeleteReviewConfirmationModal";
import ProfilePic from "@/Components/ProfilePic";
import AdminLayout from "@/Layouts/AdminLayout";
import { formatDate } from "@/Utils/util";
import { PageProps, Review, UserDetails as User } from "@/types";
import { useState } from "react";

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
            <div className="flex flex-col sm:flex-row gap-4 mb-4 text-white">
                <div className="flex flex-col gap-6 bg-dark-blue p-8 rounded-md max-w-full max-h-96">
                    <div className="flex items-center gap-4">
                        <ProfilePic img={user.profile_pic_url} size={16}/>
                    </div>
                    <div>
                        <p className="text-xl">{user.name}</p>
                        <p className="text-xl">@{user.username}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Email address</p>
                        <p>{user.email}</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex gap-1 items-center">
                            <p className="text-lg ">{user.following_count}</p>
                            <p>Following</p>
                        </div>
                        <div className="flex gap-1 items-center">
                            <p className="text-lg ">{user.followers_count}</p>
                            <p>Followers</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-6 bg-dark-blue p-8 rounded-md w-full">
                    <p className="text-2xl">General Information</p>
                    <div>
                        <p className="text-slate-400">About me</p>
                        <p className="">{user.about}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-slate-400">Join date</p>
                            <p className="">{formatDate(user.created_at)}</p>
                        </div>
                        <div>
                            <p className="text-slate-400">Books Read</p>
                            <p className="">{user.read_books_count} Books</p>
                        </div>
                        <div>
                            <p className="text-slate-400">Books Liked</p>
                            <p className="">{user.likes_count} Books</p>
                        </div>
                        <div>
                            <p className="text-slate-400">Books in Read List</p>
                            <p className="">{user.read_list_count} Books</p>
                        </div>
                        <div>
                            <p className="text-slate-400">Books Rated</p>
                            <p className="">{user.ratings_count} Books Rated</p>
                        </div>
                        <div>
                            <p className="text-slate-400">Lists Created</p>
                            <p className="">{user.lists_count} Lists</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-white bg-dark-blue p-8 rounded-md">
                <p className="text-2xl">{user.name}'s Reviews</p>
                <br />
                {reviews.length === 0 && <p className="text-slate-400 text-lg">No reviews found</p>}
                {reviews.length > 0 && <p className="text-slate-400 text-lg mb-4">Total reviews: {reviews.length}</p>}
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
