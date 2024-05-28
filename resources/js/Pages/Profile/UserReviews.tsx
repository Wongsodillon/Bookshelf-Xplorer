import UserReviewCard from "@/Components/Cards/UserReviewCard";
import ProfileLayout from "./ProfileLayout";
import { PageProps, Review, User } from "@/types";
import usePaginate from "@/Hooks/usePaginate";
import Pagination from "@/Components/Pagination";

type UserReviewsProps = PageProps & {
    reviews: Review[];
    user?: User;
}

const UserReviews = ({ auth, reviews, user = auth.user }: UserReviewsProps) => {

    const { currentPage, nextPage, prevPage, itemsToShow, maxPage, itemsPerPage } = usePaginate<Review>({
        itemsPerPage: 10,
        items: reviews
    })

    return (
        <ProfileLayout>
            {reviews.length == 0 && <p className="text-2xl text-center font-bold py-8">No reviews yet</p>}
            <div className="grid grid-cols-1 gap-2">
                {itemsToShow.map(review => (
                    <UserReviewCard key={review.id} review={review} mine={auth.user.id == user.id}/>
                ))}
            </div>
            {reviews.length != 0 &&
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={reviews.length} prevPage={prevPage} nextPage={nextPage} />
            }
        </ProfileLayout>
    );
}

export default UserReviews;
