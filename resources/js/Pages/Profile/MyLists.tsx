import ProfileLayout from "./ProfileLayout"
import BookPreview from "@/Components/BookPreview"
import { useState } from "react"
import SecondaryButton from "@/Components/UI/SecondaryButton"
import PrimaryButton from "@/Components/UI/PrimaryButton"
import { Link, router } from "@inertiajs/react"
import { BooksPageProps, Books, List, PageProps, User } from "@/types"
import { BiHide } from "react-icons/bi";
import CreateListModal from "@/Components/Modal/CreateListModal"
import ListCard from "@/Components/Cards/ListCard"

type MyListsProps = PageProps & {
    lists: List[];
    books: Books[];
    user?: User;
}

const MyLists = ({ auth, lists, user = auth.user }: MyListsProps) => {

    const [showCreateModal, setShowCreateModal] = useState(false)

    const handleCreateClick = () => {
        setShowCreateModal(true)
    }

    const handleCreateClose = () => {
        setShowCreateModal(false)
    }

    console.log(lists)

    return (
        <ProfileLayout >
            <div className="flex gap-4 my-8">
                {auth.user.id === user.id && <PrimaryButton onClick={handleCreateClick}>
                    Create New List
                </PrimaryButton>}
            </div>
            {lists.map(list => (
                <ListCard list={list} key={list.id} mine={auth.user.id === user.id}/>
            ))}
            <CreateListModal
                show={showCreateModal}
                onClose={handleCreateClose}
            />
        </ProfileLayout>
    );
}

export default MyLists;
