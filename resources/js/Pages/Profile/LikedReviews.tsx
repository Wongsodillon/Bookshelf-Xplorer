import { LikedReview, PageProps, Review, User } from "@/types";
import Liked from "./Liked";
import ProfilePic from "@/Components/ProfilePic";
import Rating from "@/Components/UI/Rating";
import { formatDate } from "@/Utils/util";
import UserReviewCard from "@/Components/Cards/UserReviewCard";
import usePaginate from "@/Hooks/usePaginate";
import Pagination from "@/Components/Pagination";
import useFilterReviews from "@/Hooks/useFilterReviews";
import FilterDropdown from "@/Components/FilterDropdown";

type LikedReviewsProps = PageProps & {
    reviews: Review[];
    user?: User;
}

const LikedReviews = ({ auth, reviews, user = auth.user }: LikedReviewsProps) => {

    const { sortBy, setSortBy, sortByOptions, filterByOptions, filterBy, setFilterBy, filteredReviews } = useFilterReviews({ reviews })

    const { currentPage, nextPage, prevPage, itemsToShow, maxPage, itemsPerPage } = usePaginate<Review>({
        itemsPerPage: 4,
        items: filteredReviews,
        scrollToTop: 300
    })

    return (
        <Liked>
            {reviews.length == 0 && <p className="text-2xl text-center font-bold py-8">No liked reviews yet</p>}
            {reviews.length != 0 && <div className="flex flex-col sm:flex-row gap-4 my-2 ml-2">
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
            </div>}
            <div className="grid grid-cols-1 gap-2">
                {itemsToShow.map(review => (
                    <UserReviewCard review={review}/>
                ))}
            </div>
            {reviews.length != 0 &&
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={filteredReviews.length} prevPage={prevPage} nextPage={nextPage} />
            }
        </Liked>
    );
}

export default LikedReviews ;
