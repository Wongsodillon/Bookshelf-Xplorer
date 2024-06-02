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
import usePaginate from "@/Hooks/usePaginate";
import DeleteReviewConfirmationModal from "./Modal/DeleteReviewConfirmationModal";
import YourReview from "./Cards/YourReview";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Pagination from "./Pagination";
import useFilterReviews from "@/Hooks/useFilterReviews";
import FilterDropdown from "./FilterDropdown";

type BookDetailsProps = {
    reviews: Review[];
    book: Books;
}

const BookReviews = ({ reviews, book }: BookDetailsProps) => {

    const [showAddReviewModal, setShowAddReviewModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { data:yourReview, loading: loadingYourReview, error: errorYourReview, fetchData: fetchYourReview } = useFetch<Review>(`/your-review/${book.id}`)

    const { sortBy, setSortBy, sortByOptions, filterByOptions, filterBy, setFilterBy, filteredReviews } = useFilterReviews({ reviews })

    const closeReviewModal = () => setShowAddReviewModal(false)
    const openReviewModal = () => setShowAddReviewModal(true)

    const { currentPage, nextPage, prevPage, itemsToShow, maxPage, itemsPerPage } = usePaginate<Review>({
        itemsPerPage: 5,
        items: filteredReviews,
        scrollToTop: 240
    })

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
            <div className="flex flex-col sm:flex-row gap-4 bg-white sm:bg-transparent my-4">
                <FilterDropdown
                    options={sortByOptions.map(s => s)}
                    value={sortBy}
                    setvalue={setSortBy}
                    fullWidth={true}
                    includeAll={false}
                />
                <FilterDropdown
                    options={filterByOptions.map(fb => fb)}
                    value={filterBy}
                    setvalue={setFilterBy}
                    fullWidth={true}
                    includeAll={false}
                />
            </div>
            <div className="flex flex-col gap-4 mt-4">
                {reviews && itemsToShow.map(review => <ReviewCard key={review.id} review={review} />)}
            </div>
            <ReviewModal onClose={closeReviewModal} show={showAddReviewModal} book={book} refetch={fetchYourReview}/>
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={filteredReviews.length} prevPage={prevPage} nextPage={nextPage} />
        </div>
    );
}

export default BookReviews;
