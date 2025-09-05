import { Books } from "@/types";

type BookPreviewProps = {
    books: Books[];
    count?: number;
    className?: string;
    onClick?: () => void;
}

const BookPreview = ({ books, count = 4, className = '' }: BookPreviewProps) => {

    books = books.slice(0, count);

    if (books.length === 0) {
        return (
            <div className="max-h-40 w-full max-w-[50%] h-64 bg-dark-blue-secondary flex items-center justify-center drop-shadow-sm">
                <p className="text-gray-500 text-lg">No books</p>
            </div>
        );
    }

    return (
        <div className={"flex cursor-pointer gap-0 " + className}>
            {books.map((book, i) => (
                <div key={book.id} className={"w-full sm:w-1/4 " + className}>
                    <img src={book.book_cover_url} className={`h-full object-cover flex-1 ${i > 0 ? '-ml-0' : ''}`}/>
                </div>
            ))}
            {books.length < count && Array.from({ length: count - books.length }).map((_, index) => (
                <div key={index} className="w-full sm:w-1/4 bg-dark-blue-secondary -ml-0">
                </div>
            ))}
        </div>
    );
}

export default BookPreview;
