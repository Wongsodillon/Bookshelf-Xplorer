import { Books, ListDetails } from "@/types"
import { ReactSortable } from "react-sortablejs"
import { formatDate } from "@/Utils/util"
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react"

type SortableBooksProps = {
    books: ListDetails[]
    setBooks: (books: ListDetails[]) => void
}

type ItemInterface = {
    id: number
    book: ListDetails
}

const SortableBooks = ({ books, setBooks }: SortableBooksProps) => {

    const [sortableBooks, setSortableBooks] = useState<ItemInterface[]>(books.map(book => {
        return {
            id: book.book_id,
            book: book
        }
    }))

    const handleDelete = (id:number) => {
        const newBooks = sortableBooks.filter(book => book.id !== id)
        setSortableBooks(newBooks)
        setBooks(newBooks.map(book => book.book))
    }

    useEffect(() => {
        setSortableBooks(books.map(book => {
            return {
                id: book.book.id,
                book: book
            }
        }))
    }, [books])

    return (
        <ReactSortable
            list={sortableBooks}
            setList={setSortableBooks}
            animation={150}
            handle=".handle"
            onSort={(e) => {
                const { newIndex, oldIndex } = e;
                if (newIndex == null || oldIndex == null) {
                    return
                }
                sortableBooks.splice(newIndex, 0, sortableBooks.splice(oldIndex, 1)[0]);
                setBooks(sortableBooks.map(book => book.book))
            }}
        >
            {sortableBooks.map((book) => (
                <div key={book.id} className="handle flex items-center justify-between bg-dark-blue-secondary p-2 mt-2">
                    <div className="flex items-center gap-4">
                        <img src={book.book.book.book_cover_url} alt={book.book.book.book_title} className="w-16 h-24" />
                        <div className="flex flex-col items-start">
                            <p className="text-lg font-semibold">{book.book.book.book_title}</p>
                            <p className="text-sm text-slate-400">{book.book.book.book_author}</p>
                            <p className="text-sm text-slate-400">Added on {formatDate(book.book.created_at)}</p>
                        </div>
                    </div>
                    <button className="mr-1 sm:mr-4" type="button" onClick={() => handleDelete(book.id)}>
                        <IoMdClose className="text-white" size={30}/>
                    </button>
                </div>
             ))}
        </ReactSortable>

    )
}

export default SortableBooks
