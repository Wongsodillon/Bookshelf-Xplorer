import UserReviewCard from "@/Components/Cards/UserReviewCard";
import ProfileLayout from "./ProfileLayout";
import { PageProps, Review, User } from "@/types";
import usePaginate from "@/Hooks/usePaginate";
import Pagination from "@/Components/Pagination";
import FilterDropdown from "@/Components/FilterDropdown";
import useFilterReviews from "@/Hooks/useFilterReviews";

type UserReviewsProps = PageProps & {
    reviews: Review[];
    user?: User;
}

const UserReviews = ({ auth, reviews, user = auth.user }: UserReviewsProps) => {

    const { sortBy, setSortBy, sortByOptions, filterByOptions, filterBy, setFilterBy, filteredReviews } = useFilterReviews({ reviews })

    const { currentPage, nextPage, prevPage, itemsToShow, maxPage, itemsPerPage } = usePaginate<Review>({
        itemsPerPage: 5,
        items: filteredReviews
    })

    return (
        <ProfileLayout>
            {reviews.length == 0 && <p className="text-2xl text-center font-bold py-8">No reviews yet</p>}
            <div className="flex flex-col sm:flex-row gap-4 bg-white sm:bg-transparent mb-4 ml-2">
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

            <div className="grid grid-cols-1 gap-2">
                {itemsToShow.map(review => (
                    <UserReviewCard key={review.id} review={review} mine={auth.user.id == user.id}/>
                ))}
            </div>
            {reviews.length != 0 &&
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={filteredReviews.length} prevPage={prevPage} nextPage={nextPage} />
            }
        </ProfileLayout>
    );
}

export default UserReviews;
