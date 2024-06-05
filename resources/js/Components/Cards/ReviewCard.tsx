import { FormEventHandler, useEffect, useState } from "react";
import { Review } from "@/types";
import { formatDate } from "@/Utils/util";
import Rating from "../UI/Rating";
import SecondaryButton from "../UI/SecondaryButton";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { Link, useForm } from "@inertiajs/react";

type ReviewCardProps = {
    review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {

    const [showSpoiler, setShowSpoiler] = useState(review.has_spoiler == 0 ? false : true);

    const { post, delete:remove, processing } = useForm({
        review_id: review.id
    })

    const toggleSpoiler = () => {
        setShowSpoiler(!showSpoiler);
    };

    const likeReview: FormEventHandler = e => {
        e.preventDefault()
        post(route('review.like'), {
            preserveScroll: true,
        })
    }

    const unlikeReview: FormEventHandler = e => {
        e.preventDefault()
        remove(route('review.unlike'), {
            preserveScroll: true
        })
    }

    return (
        <div key={review.id} className="pb-4 flex flex-col gap-2 border-b-2 border-gray-200">
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <p className="text-md">Review By <Link href={route('profile.user', { username: review.user.username })} className="font-bold text-xl">{review.user.name}</Link></p>
                {review.rating && <Rating count={review.rating} like={false} />}
            </div>
            <p>{formatDate(review.created_at)}</p>
            {review.has_spoiler != 0 && <p className="text-red-500 font-bold">THIS REVIEW MIGHT CONTAIN SPOILERS!</p>}
            {showSpoiler &&
                <SecondaryButton className="w-48 py-2 px-2" onClick={toggleSpoiler}>
                    Show Spoiler
                </SecondaryButton>
            }
            {!showSpoiler &&
                <>
                    <p>{review.review}</p>
                    <form onSubmit={review.liked ? unlikeReview : likeReview}>
                        <button className="flex gap-2 items-center cursor-pointer" disabled={processing}>
                            {review.liked ? <GoHeartFill className="text-green-600 text-2xl" /> : <GoHeart className="text-green-600 text-2xl" />}
                            <p className="text-md font-bold text-green-600">{review.likes_count} Likes</p>
                        </button>
                    </form>
                </>
            }
        </div>
    );
}

export default ReviewCard;
