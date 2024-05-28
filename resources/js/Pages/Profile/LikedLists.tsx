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
            {lists.length == 0 && <p className="text-2xl text-center font-bold py-8">No liked lists yet</p>}
            {lists.map(list => (
                <ListCard list={list} key={list.id} />
            ))}
        </Liked>
    );
}

export default LikedLists;
