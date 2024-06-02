import { Review } from "@/types";
import { useEffect, useState } from "react";

type useFilterReviewsProps = {
    reviews: Review[];
    options?: string[];
}

const useFilterReviews = ({ reviews, options }: useFilterReviewsProps) => {
    const [sortBy, setSortBy] = useState('Sort By')
    const [filterBy, setFilterBy] = useState('Filter By')
    const [filteredReviews, setFilteredReviews] = useState<Review[]>(reviews)

    const sortByOptions = ['Most Recent', 'Oldest', 'Highest Rating', 'Lowest Rating', ...(options || [])]
    const filterByOptions = ['All', 'Last 7 days', 'Last 30 days', 'Last 90 days', 'Last 12 months']

    useEffect(() => {
        let reviewsCopy = [...reviews]
        if (filterBy === 'Last 7 days') {
            reviewsCopy = reviewsCopy.filter(review => new Date(review.updated_at).getTime() > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getTime())
        }
        else if (filterBy === 'Last 30 days') {
            reviewsCopy = reviewsCopy.filter(review => new Date(review.updated_at).getTime() > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getTime())
        }
        else if (filterBy === 'Last 90 days') {
            reviewsCopy = reviewsCopy.filter(review => new Date(review.updated_at).getTime() > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).getTime())
        }
        else if (filterBy === 'Last 12 months') {
            reviewsCopy = reviewsCopy.filter(review => new Date(review.updated_at).getTime() > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).getTime())
        }
        else {
            reviewsCopy = reviewsCopy.filter(review => review)
        }
        reviewsCopy = sortReviews(reviewsCopy, sortBy)
        setFilteredReviews(reviewsCopy)
    }, [sortBy, filterBy, reviews])

    function sortReviews(reviewsToSort: Review[], sortType: string) {
        let reviewsCopy = [...reviewsToSort]
        if (sortType === 'Most Recent') {
            reviewsCopy = reviewsCopy.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        }
        else if (sortType === 'Oldest') {
            reviewsCopy = reviewsCopy.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime())
        }
        else if (sortType === 'Highest Rating') {
            reviewsCopy = reviewsCopy.sort((a, b) => b.rating - a.rating)
        }
        else if (sortType === 'Lowest Rating') {
            reviewsCopy = reviewsCopy.sort((a, b) => a.rating - b.rating)
        }
        return reviewsCopy
    }

    useEffect(() => {
        const sortResult = sortReviews(filteredReviews, sortBy)
        setFilteredReviews(sortResult)
    }, [sortBy])

    return { sortBy, setSortBy, sortByOptions, filterByOptions, filterBy, setFilterBy, filteredReviews }
}

export default useFilterReviews;
