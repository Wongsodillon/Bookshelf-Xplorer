import { LikedReview, PageProps, Review, User } from "@/types";
import Liked from "./Liked";
import ProfilePic from "@/Components/ProfilePic";
import Rating from "@/Components/UI/Rating";
import { formatDate } from "@/Utils/util";
import UserReviewCard from "@/Components/Cards/UserReviewCard";

type LikedReviewsProps = PageProps & {
    reviews: Review[];
    user?: User;
}

const LikedReviews = ({ auth, reviews, user = auth.user }: LikedReviewsProps) => {
    console.log(reviews)

    return (
        <Liked>
            <div className="grid grid-cols-1 gap-2">
                {reviews.map(review => (
                    <UserReviewCard review={review}/>
                ))}
            </div>
        </Liked>
    );
}

export default LikedReviews ;
