import Dropdown from "@/Components/UI/Dropdown";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { BooksPageProps, Books } from "@/types";
import useFilter from "@/Hooks/useFilter";
import BookCard from "@/Components/Cards/BookCard";
import FilterDropdown from "@/Components/FilterDropdown";
import '../Styles/custom.css'

const BooksPage = ({ auth, books, genres, publishers }: BooksPageProps ) => {

    const { genre, setGenre, publisher, setPublisher, release, setRelease, sortByValues, filteredBooks } = useFilter({ books });

    return (
        <MainLayout user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Books</h2>}
        >
            <Head title="Books" />
            <div className="py-8 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-5 md:grid-cols-4">
                        {filteredBooks.map(book => (
                            <BookCard key={book.id} book={book} className={'w-full'} />
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default BooksPage;

