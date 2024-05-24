import UserReviewCard from "@/Components/Cards/UserReviewCard";
import ProfileLayout from "./ProfileLayout";
import { PageProps, Review, User } from "@/types";
import { formatDate } from "@/Utils/util";

type UserReviewsProps = PageProps & {
    reviews: Review[];
    user?: User;
}

const UserReviews = ({ auth, reviews, user = auth.user }: UserReviewsProps) => {

    return (
        <ProfileLayout>
            <div className="grid grid-cols-1 gap-2">
                {reviews.map(review => (
                    <UserReviewCard key={review.id} review={review} mine={auth.user.id == user.id}/>
                ))}
            </div>
        </ProfileLayout>
    );
}

export default UserReviews;
