import { Review } from "@/types";
import { formatDate } from "@/Utils/util";
import Rating from "../UI/Rating";
import ProfilePic from "../ProfilePic";
import { router } from "@inertiajs/react";
import DangerButton from "../UI/DangerButton";

type UserReviewCardProps = {
    review: Review;
    mine? : boolean;
    admin?: boolean;
    onOpen?: (review: Review) => void;
}

const UserReviewCard = ({ review, mine = false, admin = false, onOpen }: UserReviewCardProps) => {

    return (
        <div className="flex gap-4 p-3 hover:bg-gray-100 cursor-pointer duration-200 ease-linear rounded-md" key={review.id}>
            <div className='w-28 h-40 cursor-pointer'>
                <img src={review.book.book_cover_url} alt="Book" className="object-fit w-full h-full rounded-sm" />
            </div>
            <div className="flex flex-1 flex-col gap-2">
                <div className="flex justify-between">
                    <p className="text-xl font-bold" onClick={() => router.visit(`/books/${review.book_id}`)}>{review.book.book_title}</p>
                    {admin && onOpen && <DangerButton onClick={() => onOpen(review)}>Delete</DangerButton>}
                </div>
                <div className="flex flex-wrap sm:flex-row sm:items-center gap-2">
                    {!mine && <ProfilePic img={review.user.profile_pic_url} size={6} />}
                    <Rating count={review.rating} like={false}/>
                    <p className="text-gray-500">Read by {mine ? 'you' : review.user.name} on {formatDate(review.created_at)}</p>
                </div>
                <p>{review.review}</p>
                <p>{review.likes_count} likes</p>
            </div>
        </div>
    );
}

export default UserReviewCard;
