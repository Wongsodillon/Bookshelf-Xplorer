import { LikedReview, PageProps, Review, User } from "@/types";
import Liked from "./Liked";
import ProfilePic from "@/Components/ProfilePic";
import Rating from "@/Components/UI/Rating";
import { formatDate } from "@/Utils/util";
import UserReviewCard from "@/Components/Cards/UserReviewCard";
import usePaginate from "@/Hooks/usePaginate";
import Pagination from "@/Components/Pagination";

type LikedReviewsProps = PageProps & {
    reviews: Review[];
    user?: User;
}

const LikedReviews = ({ auth, reviews, user = auth.user }: LikedReviewsProps) => {

    const { currentPage, nextPage, prevPage, itemsToShow, maxPage, itemsPerPage } = usePaginate<Review>({
        itemsPerPage: 3,
        items: reviews
    })

    return (
        <Liked>
            {reviews.length == 0 && <p className="text-2xl text-center font-bold py-8">No liked reviews yet</p>}
            <div className="grid grid-cols-1 gap-2">
                {itemsToShow.map(review => (
                    <UserReviewCard review={review}/>
                ))}
            </div>
            {reviews.length != 0 &&
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={reviews.length} prevPage={prevPage} nextPage={nextPage} />
            }
        </Liked>
    );
}

export default LikedReviews ;
