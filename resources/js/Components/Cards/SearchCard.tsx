import { Books } from "@/types";
import { router } from "@inertiajs/react";
import PrimaryButton from "../UI/PrimaryButton";

const SearchCard = ({ book }: { book: Books }) => {

    const handleClick = () => {
        console.log(book.id)
        router.visit(`/books/${book.id}`)
    }

    return (
        <div className="flex gap-4 border-b-2 border-gray-200 py-4">
            <div className='w-36 h-52 cursor-pointer'>
                <img src={book.book_cover_url} alt="Book" className="object-fit w-full h-full" />
            </div>
            <div className="flex flex-col flex-1 justify-between">
                <p className="text-xl md:text-2xl font-extrabold cursor-pointer" onClick={handleClick}>{book.book_title}</p>
                <p className="line-clamp-3">{book.book_description}</p>
                <p>Written by {book.book_author}</p>
                <PrimaryButton onClick={handleClick} className="max-w-40 py-3">
                    View Book
                </PrimaryButton>
            </div>
        </div>
    );
}

export default SearchCard;
