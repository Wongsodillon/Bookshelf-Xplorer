import { Books, BooksPageProps, Genres, PageProps, Publishers, User } from "@/types";
import ProfileLayout from "./ProfileLayout";
import FilterDropdown from "@/Components/FilterDropdown";
import useFilter from "@/Hooks/useFilter";
import BookCard from "@/Components/Cards/BookCard";

type ReadListPageProps = PageProps & {
    books: Books[];
    genres: Genres[];
    publishers: Publishers[];
    user?: User;
}


const ReadList = ({ books, genres, publishers }: ReadListPageProps) => {

    const { genre, setGenre, publisher, setPublisher, release, setRelease, sortByValues, filteredBooks } = useFilter({ books, sortOptions: ['When Added'] });

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
            </div>
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
                {filteredBooks.map(book => (
                    <BookCard key={book.id} book={book} className={'w-full h-64 md:h-72'} displayRatings={false} />
                ))}
            </div>
        </ProfileLayout>
    );
}

export default ReadList;
