import { Books, Review, User } from "@/types";
import { useEffect, useState } from "react";
import { formatDate } from "@/Utils/util";
import ReviewCard from "./Cards/ReviewCard";
import axios from "axios";
import useFetch from "@/Hooks/useFetch";
import Rating from "./UI/Rating";
import ReviewModal from "./Modal/ReviewModal";
import DangerButton from "./UI/DangerButton";
import PrimaryButton from "./UI/PrimaryButton";
import DeleteReviewConfirmationModal from "./Modal/DeleteReviewConfirmationModal";
import YourReview from "./Cards/YourReview";

type BookDetailsProps = {
    reviews: Review[];
    book: Books;
}

const BookReviews = ({ reviews, book }: BookDetailsProps) => {

    const [showAddReviewModal, setShowAddReviewModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { data:yourReview, loading: loadingYourReview, error: errorYourReview, fetchData: fetchYourReview } = useFetch<Review>(`/your-review/${book.id}`)

    const closeReviewModal = () => setShowAddReviewModal(false)
    const openReviewModal = () => setShowAddReviewModal(true)

    const closeDeleteModal = () => setShowDeleteModal(false)
    const openDeleteModal = () => setShowDeleteModal(true)

    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <p className="text-2xl font-bold">User Reviews</p>
                {!yourReview && <div onClick={openReviewModal} className="flex gap-2 p-1 items-center cursor-pointer rounded-sm transition-all duration-200 hover:bg-gray-200">
                    <p className="text-blue-600 text-xl font-bold">+ Review</p>
                </div>}
            </div>
            {loadingYourReview && <p>Loading reviews...</p>}
            {errorYourReview && <p>Failed to load reviews</p>}
            {yourReview &&
               <YourReview review={yourReview} refetch={fetchYourReview} openReviewModal={openReviewModal} />
            }
            <div className="flex flex-col gap-4 mt-4">
                {reviews && reviews.map(review => <ReviewCard key={review.id} review={review} />)}
            </div>
            <ReviewModal onClose={closeReviewModal} show={showAddReviewModal} book={book} refetch={fetchYourReview}/>
        </div>
    );
}

export default BookReviews;
