import { LikedReview, PageProps, Review, List, User } from "@/types";
import Liked from "./Liked";
import ProfilePic from "@/Components/ProfilePic";
import { formatDate } from "@/Utils/util";
import BookPreview from "@/Components/BookPreview";
import ListCard from "@/Components/Cards/ListCard";

type LikedListsProps = PageProps & {
    lists: List[];
    user: User;
}

const LikedLists = ({ lists, user }: LikedListsProps) => {

    return (
        <Liked>
            {lists.map(list => (
                <ListCard list={list} key={list.id} />
            ))}
        </Liked>
    );
}

export default LikedLists;
