import { useState, useEffect } from "react"
import { Books, Genres, Publishers } from "@/types";
import BookCard from "@/Components/Cards/BookCard";
import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import FilterDropdown from "@/Components/FilterDropdown";
import useFilter from "@/Hooks/useFilter";
import SearchCard from "@/Components/Cards/SearchCard";

type SearchPageProps = PageProps & {
    search: string;
    books: Books[];
    genres: Genres[];
    publishers: Publishers[]
}

const SearchPage = ({ auth, search, books, genres, publishers }: SearchPageProps) => {

    const message = (books.length === 0) ? `No matches for '${search}'` : `${books.length} matches for '${search}'`;
    const { genre, setGenre, publisher, setPublisher, release, setRelease, sortByValues, filteredBooks } = useFilter({ books });

    return (
        <MainLayout user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{message}</h2>}
        >
            <div className="py-8 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <p className="text-2xl">Books</p>
                    <div className="flex flex-col sm:flex-row gap-4 bg-white sm:bg-transparent my-6">
                        <FilterDropdown
                            value={genre}
                            setvalue={setGenre}
                            options={genres.map(g => g.genre_name)}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredBooks.map(book => (
                            <SearchCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default SearchPage;
