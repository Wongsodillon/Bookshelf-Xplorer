import { Books, Genres, PageProps, Publishers, User } from "@/types";
import ProfileLayout from "./ProfileLayout";
import FilterDropdown from "@/Components/FilterDropdown";
import useFilter from "@/Hooks/useFilter";
import BookCard from "@/Components/Cards/BookCard";
import Rating from "@/Components/UI/Rating";
import { usePage } from "@inertiajs/react";
import "../../Styles/custom.css";

type ReadBooksPageProps = PageProps & {
    books: Books[];
    genres: Genres[];
    publishers: Publishers[];
    user?: User;
}

const ReadBooks = ({ books, genres, publishers }: ReadBooksPageProps) => {

    const { genre, setGenre, publisher, setPublisher, release, setRelease, sortByValues, likeOptions, likedOnly, setLikedOnly, filteredBooks } = useFilter({ books, sortOptions: ['Your Highest Rating', 'Your Lowest Rating'] });

    console.log(books)

    return (
        <ProfileLayout>
            <div className="flex flex-col sm:flex-row gap-4 bg-white sm:bg-transparent mb-8">
                <FilterDropdown
                    options={genres.map(genre => genre.genre_name)}
                    value={genre}
                    setvalue={setGenre}
                />
                <FilterDropdown
                    options={publishers.map(publisher => publisher.publisher_name)}
                    value={publisher}
                    setvalue={setPublisher}
                />
                <FilterDropdown
                    options={sortByValues}
                    value={release}
                    setvalue={setRelease}
                    includeAll={false}
                />
                <FilterDropdown
                    options={likeOptions}
                    value={likedOnly}
                    setvalue={setLikedOnly}
                />
            </div>
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
                {filteredBooks.map(book => (
                    <div className="flex flex-col gap-2" key={book.id}>
                        <BookCard book={book} className={'w-full h-64 md:h-72'} displayRatings={false} />
                        { book.rating && <Rating count={book.rating.rating} like={book.user_like ? true : false}/>}
                        { !book.rating && <Rating like={book.user_like ? true : false}/>}
                    </div>
                ))}
            </div>
        </ProfileLayout>
    );
}

export default ReadBooks;
