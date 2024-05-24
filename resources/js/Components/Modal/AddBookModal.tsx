import Modal from "../Modal";
import { useState, useEffect, useCallback } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Books, PageProps } from "@/types";
import TextInput from "../UI/TextInput";
import axios from "axios";
import useDebounce from "@/Hooks/useDebounce";
import BookCardInModal from "../Cards/BookCardInModal";
import { useToast } from "@/Hooks/useToast";

type AddBookModalProps = {
    show: boolean;
    addToList: (book: Books) => void,
    onClose: () => void;
}

const AddBookModal = ({ show, onClose, addToList }: AddBookModalProps) => {

    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 500)
    const [books, setBooks] = useState<Books[]>([])

    const list_id = usePage<PageProps>().props.list.id

    const fetchBooks = useCallback(async (search: string) => {
        if (search.length > 0) {
            const response = await axios.get(`/search-books/${search}`)
            setBooks(response.data)
        }
        else {
            setBooks([])
        }
    }, [])

    useEffect(() => {
        fetchBooks(debouncedSearch);
    }, [debouncedSearch, fetchBooks]);

    const onClick = (book: Books) => {
        addToList(book)
        onClose()
        setSearch('')
    }

    const { toastSuccess, toastError } = useToast()

    return (
        <Modal show={show} onClose={onClose} maxWidth="5xl">
            <div className="p-12">
                <p className="text-2xl mb-4">Add Book to list</p>
                <TextInput placeholder="Search..." className="w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
                {books && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8 mt-4">
                        {books.map(book => (
                            <BookCardInModal key={book.id} book={book} onClick={onClick} />
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default AddBookModal;
