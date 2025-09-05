import { Books, List, ListDetails, PageProps, User } from "@/types";
import ProfileLayout from "./ProfileLayout";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/UI/TextInput";
import TextArea from "@/Components/UI/TextArea";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import DangerButton from "@/Components/UI/DangerButton";
import InputLabel from "@/Components/UI/InputLabel";
import Dropdown from "@/Components/UI/Dropdown";
import { FormEventHandler, useEffect, useState } from "react";
import FilterDropdown from "@/Components/FilterDropdown";
import Checkbox from "@/Components/UI/Checkbox";
import { usePrivacy } from "@/Hooks/usePrivacy";
import SortableBooks from "@/Components/SortableBooks";
import SecondaryButton from "@/Components/UI/SecondaryButton";
import AddBookModal from "@/Components/Modal/AddBookModal";
import { useToast } from "@/Hooks/useToast";

type EditListProps = PageProps & {
    list: List;
    books: ListDetails[];
    user?: User;
}

const EditList = ({ list, books }: EditListProps) => {

    const { data, setData, patch, processing, errors, delete: destroy } = useForm({
        list_id: list.id,
        list_name: list.list_name,
        list_description: list.list_description,
        list_is_public: list.is_public,
        list_books: books,
    });

    const [listBooks, setListBooks] = useState<ListDetails[]>(books)
    const [showModal, setShowModal] = useState(false)

    const onOpen = () => setShowModal(true)
    const onClose = () => setShowModal(false)

    const { toastSuccess, toastError } = useToast()
    const { privacyOptions, privacy, setPrivacy } = usePrivacy({ is_public: list.is_public })

    const handleSubmit: FormEventHandler = e => {
        e.preventDefault();
        patch(route('lists.update', { id: list.id }), {
            preserveScroll: true,
            onSuccess: () => toastSuccess('List has been updated'),
        })
    }

    const handleDelete: FormEventHandler = e => {
        destroy(route('lists.delete', { id: list.id }), {
            preserveScroll: true,
            onSuccess: () => toastSuccess('List has been deleted'),
        })
    }

    const handleCancel: FormEventHandler = e => {
        e.preventDefault()
        history.back()
    }

    useEffect(() => {
        setData('list_is_public', privacy == 'Anyone - Public List' ? 1 : 0)
    }, [privacy])

    useEffect(() => {
        setData('list_books', listBooks)
    }, [listBooks])


    const addToList = (book: Books) => {
        if (listBooks.find(listBook => listBook.book_id === book.id)) {
            toastError('Book already added to list')
            return
        }
        setListBooks([...listBooks, {
            list_id: list.id,
            book_id: book.id,
            order: listBooks.length + 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            book
        }])
        toastSuccess('Book added to list')
    }

    return (
        <ProfileLayout>
            <p className="text-2xl">Edit List</p>
            <form onSubmit={handleSubmit}>
                <div className="flex mt-4 gap-8 h-36">
                    <div className="flex flex-col gap-6 flex-1">
                        <div>
                            <InputLabel htmlFor="name" value="List Name" />
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.list_name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('list_name', e.target.value)}
                            />
                        </div>
                        <FilterDropdown
                            options={privacyOptions.map(option => option.label)}
                            value={privacy}
                            setvalue={setPrivacy}
                            includeAll={false}
                            fullWidth={true}
                        />
                    </div>
                    <div className="flex-1">
                        <InputLabel htmlFor="description" value="List Description" />
                        <TextArea
                            id="description"
                            name="description"
                            value={data.list_description}
                            className="w-full h-40 resize-none mt-1"
                            autoComplete="description"
                            onChange={(e) => setData('list_description', e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-16">
                    <p className="text-2xl">Books</p>
                    <SortableBooks books={listBooks} setBooks={setListBooks}/>
                    <div onClick={onOpen} className="group border border-transparent flex items-center w-full min-h-24 justify-center bg-dark-blue-secondary p-2 mt-2 cursor-pointer hover:border-light-blue transition-colors duration-300"
                    >
                    <p className="text-bold text-xl text-slate-400 group-hover:text-light-blue transition-colors duration-300">Add Books</p>
                    </div>
                </div>
                <div className="flex gap-2 mt-8 sm:gap-8">
                    <SecondaryButton className="text-white" onClick={handleCancel}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton>
                        Save List
                    </PrimaryButton>
                    <DangerButton onClick={handleDelete} type="button">
                        Delete List
                    </DangerButton>
                </div>
            </form>
            <AddBookModal onClose={onClose} show={showModal} addToList={addToList} />
        </ProfileLayout>
    );
}

export default EditList;
