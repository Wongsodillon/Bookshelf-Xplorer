import Dropdown from "@/Components/UI/Dropdown";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { BooksPageProps, Books } from "@/types";
import useFilter from "@/Hooks/useFilter";
import BookCard from "@/Components/Cards/BookCard";
import FilterDropdown from "@/Components/FilterDropdown";
import useInfiniteScroll from "@/Hooks/useInfiniteScroll";
import '../Styles/custom.css'

const BooksPage = ({ auth, books, genres, publishers }: BooksPageProps ) => {

    const { genre, setGenre, publisher, setPublisher, release, setRelease, sortByValues, filteredBooks } = useFilter({ books });

    const { isIntersecting, endRef } = useInfiniteScroll()

    return (
        <MainLayout user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Books</h2>}
        >
            <Head title="Books" />
            <div className="py-4 md:py-6 px-4 sm:px-8">
                <div className="max-w-7xl relative flex-col md:flex-row flex md:gap-6 mx-auto sm:px-6 lg:px-8">
                    <div className="flex lg:min-w-60 sm:min-w-48 flex-col mb-8">
                        <div className="sticky w-full top-20">
                            <FilterDropdown
                                options={genres.map(genre => genre.genre_name)}
                                value={genre}
                                setvalue={setGenre}
                                fullWidth={true}
                                withBorder={false}
                                className="py-6 px-6 bg-dark-blue rounded-none"
                            />
                            <FilterDropdown
                                options={publishers.map(publisher => publisher.publisher_name)}
                                value={publisher}
                                setvalue={setPublisher}
                                fullWidth={true}
                                withBorder={false}
                                className="py-6 px-6 bg-dark-blue rounded-none"
                            />
                            <FilterDropdown
                                options={sortByValues}
                                value={release}
                                setvalue={setRelease}
                                includeAll={false}
                                fullWidth={true}
                                withBorder={false}
                                className="py-6 px-6 bg-dark-blue rounded-none"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 md:gap-2 lg:gap-6 lg:grid-cols-4 md:grid-cols-3">
                        {filteredBooks.map(book => (
                            <BookCard key={book.id} book={book} className={'w-full'} />
                        ))}
                    </div>
                    <div ref={endRef}></div>
                </div>
            </div>
        </MainLayout>
    );
}

export default BooksPage;

