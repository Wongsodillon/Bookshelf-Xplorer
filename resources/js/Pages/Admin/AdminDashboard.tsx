import AdminLayout from "@/Layouts/AdminLayout";
import { Books } from "@/types";
import { BooksPageProps } from "@/types";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import DangerButton from "@/Components/UI/DangerButton";
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "@/Components/Modal/DeleteConfirmationModal";
import { router } from "@inertiajs/react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/Components/UI/Table";
import usePaginate from "@/Hooks/usePaginate";

const AdminDashboard = ({ auth, books }: BooksPageProps) => {

    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Books>(books[0]);

    const searchedBooks = books.filter(book => book.book_title.toLowerCase().includes(search.toLowerCase()));

    const { currentPage, nextPage, prevPage, itemsToShow, maxPage, itemsPerPage } = usePaginate<Books>({
        itemsPerPage: 5,
        items: searchedBooks
    })

    const onOpen = (book: Books) => {
        setSelectedBook(book);
        setShowModal(true);
    }

    const onClose = () => {
        setShowModal(false);
    }

    const onEdit = (id: number) => {
        router.visit(`admin/edit-book/${id}`);
    }

    return (
        <AdminLayout user={auth.user} header="Dashboard">

            <form className="w-full mx-auto mb-8">
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Books" onChange={e => setSearch(e.target.value)} />
                </div>
            </form>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Cover</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Genres</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {searchedBooks.map(book => (
                            <TableRow key={book.id}>
                                <TableCell>{book.id}</TableCell>
                                <TableCell>
                                    <img src={book.book_cover_url} alt="" className="max-w-32"/>
                                </TableCell>
                                <TableCell>{book.book_title}</TableCell>
                                <TableCell>{book.book_author}</TableCell>
                                <TableCell>{book.genres.map(genre => genre.genre_name).join(', ')}</TableCell>
                                <TableCell>
                                    <PrimaryButton className="mb-6 mr-4" onClick={() => onEdit(book.id)}>
                                        Edit
                                    </PrimaryButton>
                                    <DangerButton onClick={() => onOpen(book)}>
                                        Delete
                                    </DangerButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <DeleteConfirmationModal show={showModal} onClose={onClose} book={selectedBook}/>
        </AdminLayout>
    );
}

export default AdminDashboard;
