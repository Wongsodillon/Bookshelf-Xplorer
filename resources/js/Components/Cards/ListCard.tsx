import { List } from "@/types";
import BookPreview from "../BookPreview";
import { BiHide } from "react-icons/bi";
import { Link, router } from "@inertiajs/react"
import ProfilePic from "../ProfilePic";
type ListCardProps = {
    list: List;
    mine?: boolean;
}

const ListCard = ({ list, mine = false }: ListCardProps) => {

    const GoToListDetails = (id: number) => {
        router.visit(`/lists/${id}`)
    }

    return (
        <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
                <BookPreview books={list.list_details.map(detail => detail.book)} className="flex-1 min-h-48" count={4}/>
                <div className="flex flex-col gap-2 flex-1">
                    <div className="flex justify-between">
                        <p onClick={() => GoToListDetails(list.id)} className="text-xl md:text-2xl font-semibold cursor-pointer">{list.list_name}</p>
                        {mine && <Link href={route('lists.edit', { id: list.id })} className="text-light-blue">Edit</Link>}
                    </div>
                    {!list.is_public &&
                        <div className="flex items-center gap-3">
                            <p className="text-gray-500 font-bold">Private List</p>
                            <BiHide className="text-gray-500" size={20}/>
                        </div>
                    }
                    <p className="line-clamp-4 text-base">{list.list_description}</p>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        {!mine && <div className="flex items-center gap-2">
                            <ProfilePic size={6} img={list.user.profile_pic_url}/>
                            <p className="text-gray-500">Created by {list.user.name}</p>
                        </div>}
                        <p className="text-slate-400">{list.list_details.length} Books</p>
                    </div>
                    <p className="text-slate-400">{list.liked_lists_count} Likes</p>
                </div>
            </div>
        </div>
    );
}

export default ListCard;
