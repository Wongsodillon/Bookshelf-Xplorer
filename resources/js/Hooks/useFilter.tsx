import { Books } from "@/types";
import { calcRating } from "@/Utils/util";
import { useState, useEffect } from "react";

type useFilterProps = {
    books: Books[];
    sortOptions?: string[];
}

const useFilter = ({ books, sortOptions }: useFilterProps) => {
    const [genre, setGenre] = useState('Genre')
    const [publisher, setPublisher] = useState('Publisher')
    const [release, setRelease] = useState('Sort By')
    const [filteredBooks, setFilteredBooks] = useState<Books[]>(books)
    const [likedOnly, setLikedOnly] = useState('Show Liked')

    const sortByValues = ['Highest Rating', 'Lowest Rating', 'Newest to Oldest', 'Oldest to Newest', ...(sortOptions || [])]
    const likeOptions = ['Liked Books Only']

    useEffect(() => {
        let booksCopy = [...books]
        if (genre !== 'Genre' && genre !== 'All') {
            booksCopy = booksCopy.filter(book => book.genres.some(genreObj => genreObj.genre_name === genre))
        }
        if (publisher !== 'Publisher' && publisher !== 'All') {
            booksCopy = booksCopy.filter(book => book.publisher.publisher_name === publisher)
        }
        if (likedOnly !== 'Show Liked' && likedOnly !== 'All') {
            booksCopy = booksCopy.filter(book => book.user_like)
        }
        const sortedBooks = sortByRelease(booksCopy, release);
        setFilteredBooks(sortedBooks);
    }, [genre, publisher, books, likedOnly])

    function sortByRelease(booksToSort: Books[], sortType: string) {
        const booksCopy = [...booksToSort]
        if (sortType == 'Newest to Oldest') {
            return booksCopy.sort((a, b) => new Date(b.book_publish_date).getTime() - new Date(a.book_publish_date).getTime())
        }
        else if (sortType == 'Oldest to Newest') {
            return booksCopy.sort((a, b) => new Date(a.book_publish_date).getTime() - new Date(b.book_publish_date).getTime())
        }
        else if (sortType === 'Highest Rating') {
            return booksCopy.sort((a, b) => calcRating(b) - calcRating(a));
        }
        else if (sortType === 'Lowest Rating') {
            return booksCopy.sort((a, b) => calcRating(a) - calcRating(b));
        }
        else if (sortType === 'Your Highest Rating')  {
            return booksCopy.sort((a, b) => {
                if (a.rating && b.rating)
                    return b.rating.rating - a.rating.rating
                else if (a.rating) return -1
                else if (b.rating) return 1
                else return 0
            })
        }
        else if (sortType === 'Your Lowest Rating') {
            return booksCopy.sort((a, b) => {
                if (a.rating && b.rating)
                    return a.rating.rating - b.rating.rating
                else if (a.rating) return 1
                else if (b.rating) return -1
                else return 0
            })
        }
        else if (sortType === 'When Added') {
            return booksCopy.sort((a, b) => new Date(a.user_read_list.created_at).getTime() - new Date(b.user_read_list.created_at).getTime())
        }
        else {
            return booksCopy
        }
    }

    useEffect(() => {
        const sortResult = sortByRelease(filteredBooks, release)
        setFilteredBooks(sortResult)
    }, [release])

    return { genre, setGenre, publisher, setPublisher, release, setRelease, sortByValues, likedOnly, setLikedOnly, likeOptions, filteredBooks };
}

export default useFilter;
