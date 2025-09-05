import { Books } from "@/types";
import PrimaryButton from "../UI/PrimaryButton";

type BookCardInModalProps = {
    book: Books
    onClick: (book: Books) => void
}

const BookCardInModal = ({ book, onClick }: BookCardInModalProps) => {

    return (
        <div className="flex gap-4 border-b-2 border-dark-blue-secondary py-4">
            <div className='w-36 h-56 cursor-pointer'>
                <img src={book.book_cover_url} alt="Book" className="object-fit w-full h-full" />
            </div>
            <div className="flex flex-col flex-1 justify-between">
                <p className="text-xl md:text-2xl font-extrabold cursor-pointer">{book.book_title}</p>
                <p className="line-clamp-3">{book.book_description}</p>
                <p>Written by {book.book_author}</p>
                <PrimaryButton className="max-w-40 py-3" onClick={() => onClick(book)}>
                    Add Book
                </PrimaryButton>
            </div>
        </div>
    );
}

export default BookCardInModal;
