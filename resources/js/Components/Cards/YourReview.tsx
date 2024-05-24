import { Review } from "@/types"
import Rating from "../UI/Rating";
import PrimaryButton from "../UI/PrimaryButton";
import DangerButton from "../UI/DangerButton";
import { MouseEventHandler, useState } from "react";
import { formatDate } from "@/Utils/util";
import DeleteReviewConfirmationModal from "../Modal/DeleteReviewConfirmationModal";
import ReviewModal from "../Modal/ReviewModal";

type YourReviewProps = {
    review: Review
    refetch: CallableFunction
    openReviewModal: MouseEventHandler<HTMLButtonElement>
}

const YourReview = ({ review, refetch, openReviewModal }: YourReviewProps) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const closeDeleteModal = () => setShowDeleteModal(false)
    const openDeleteModal = () => setShowDeleteModal(true)

    return (
        <div className="flex gap-2 flex-col my-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <p className="text-xl font-bold">You reviewed this book on {formatDate(review.created_at)}</p>
                <Rating count={review.rating} like={false} />
            </div>
            <div>
                <p>{review.review}</p>
                <p>{review.likes_count} people liked your review</p>
            </div>
            <div className="flex gap-6">
                <PrimaryButton onClick={openReviewModal}>Edit</PrimaryButton>
                <DangerButton onClick={openDeleteModal} >Delete</DangerButton>
            </div>
            <DeleteReviewConfirmationModal show={showDeleteModal} onClose={closeDeleteModal} review={review} refetch={refetch}/>
        </div>
    );
}

export default YourReview;
