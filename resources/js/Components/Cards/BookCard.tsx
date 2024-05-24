import { Books } from "@/types"
import { calcRating } from "@/Utils/util"
import { router } from "@inertiajs/react"
import Overlay from "../UI/Overlay"
import "../../Styles/custom.css"
import { FaStar } from "react-icons/fa"

const BookCard = ({ book, className, displayRatings = true }: { book: Books, className: string, displayRatings?: boolean }) => {

    const handleClick = () => {
        console.log(book.id)
        router.visit(`/books/${book.id}`)
    }

    return (
        <div key={book.id} onClick={() => handleClick()} className={"book-container max-h-96 relative overflow-hidden hover:cursor-pointer " + className}>
            <img src={book.book_cover_url} alt="Book" className="w-full h-full rounded-md"/>
            <Overlay>
                <p className="text-white text-center text-base sm:text-lg">{book.book_title}</p>
                <br />
                <p className="text-white text-center text-base sm:text-md">Genre: {book.genres.map(genre => genre.genre_name).join(', ')}</p>
                <br />
                {book.ratings && displayRatings &&
                    <div className="flex items-center gap-2">
                        <FaStar className='text-yellow-500' size={20}/>
                        <p className="text-white text-center text-base sm:text-lg">
                            {calcRating(book)}/5
                        </p>
                    </div>
                }
            </Overlay>
        </div>
    )
}

export default BookCard
