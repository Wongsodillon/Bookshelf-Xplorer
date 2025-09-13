import Dropzone from "@/Components/Dropzone";
import FilterDropdown from "@/Components/FilterDropdown";
import InputError from "@/Components/UI/InputError";
import InputLabel from "@/Components/UI/InputLabel";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import TextArea from "@/Components/UI/TextArea";
import TextInput from "@/Components/UI/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { Books, Genres, Publishers, PageProps } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

type EditBookProps = PageProps & {
    book: Books,
    genres: Genres[],
    publishers: Publishers[]
}

type BookInput = {
    book_title: string;
    author: string;
    desc: string;
    genre: string[];
    publisher: string;
    page: string;
    publish_date: string;
    image: File | null;
}

const EditBook = ({ auth, book, genres, publishers }: EditBookProps) => {

    const [selectPublisher, setPublisher] = useState<string>(book.publisher.publisher_name)
    const [genre, setGenre] = useState<string>('Genre')
    const [selectedGenres, setSelectedGenres] = useState<string[]>(book.genres.map(g => g.genre_name))

    const { data, setData, post, patch, errors } = useForm<BookInput>({
        book_title: book.book_title,
        author: book.book_author,
        desc: book.book_description,
        genre: book.genres.map(g => g.genre_name),
        publisher: book.publisher.publisher_name,
        page: book.book_page.toString(),
        publish_date: book.book_publish_date,
        image: null,
    })

    const onDrop = (acceptedFiles: File[]) => {
        setData("image", acceptedFiles[0]);
    };

    useEffect(() => {
        if (genre !== 'Genre' && !selectedGenres.includes(genre)) {
            setSelectedGenres(prevGenres => [...prevGenres, genre])
        }
    }, [genre])

    const handleRemoveGenre = (delGenre: string) => {
        setGenre('Genre')
        setSelectedGenres(prevGenres => prevGenres.filter(g => g !== delGenre))
    }


    useEffect(() => {
        setData('genre', selectedGenres)
        if (errors.genre) {
            errors.genre = undefined
        }
    }, [selectedGenres])

    useEffect(() => {
        setData('publisher', selectPublisher)
    }, [selectPublisher])

    const handleSubmit: FormEventHandler = e => {
        e.preventDefault()
        post(route('admin.update', { id: book.id }))
    }

    return (
        <AdminLayout user={auth.user} header={`Edit ${book.book_title}`}>
            <form className="flex p-6 bg-dark-blue rounded-md flex-col sm:flex-row gap-8" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 items-center">
                    <Dropzone onDrop={onDrop} img={book.book_cover_url}/>
                    <InputLabel value="Book Cover" className="text-xl"/>
                    <InputError message={errors.image} className=""/>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <div>
                        <InputLabel htmlFor="title" value='Book Title' className="text-xl mb-2"/>
                        <TextInput id="title" type="text" name="title" className="mt-1 block w-full" onChange={e => setData('book_title', e.target.value)} value={data.book_title}/>
                        <InputError message={errors.book_title} className="mt-2"/>
                    </div>
                    <div>
                        <InputLabel htmlFor="author" value='Book Author' className="text-xl mb-2"/>
                        <TextInput id="author" type="text" name="author" className="mt-1 block w-full" onChange={e => setData('author', e.target.value)} value={data.author}/>
                        <InputError message={errors.author} className="mt-2"/>
                    </div>
                    <div>
                        <InputLabel htmlFor="desc" value='Book Description' className="text-xl mb-2"/>
                        <TextArea id="desc" name="desc" className="mt-1 block w-full h-48" onChange={e => setData('desc', e.target.value)} value={data.desc}/>
                        <InputError message={errors.desc} className="mt-2"/>
                    </div>
                    <div className="flex-1">
                        <InputLabel htmlFor="genre" value='Book Genres' className="text-xl mb-2"/>
                        <FilterDropdown
                            options={genres.map(g => g.genre_name)}
                            value={genre}
                            setvalue={setGenre}
                            above={true}
                            fullWidth={true}
                            includeAll={false}
                        />
                        <div className="flex gap-4 flex-wrap mt-3">
                            {selectedGenres.map((g, i) => (
                                <div key={i} className="bg-dark-blue-secondary rounded-md py-2 px-4 flex items-center gap-2">
                                    <p className="text-md text-white">{g}</p>
                                    <button className="cursor-pointer" onClick={() => handleRemoveGenre(g)} type="button">
                                        <IoMdClose size={24} className="text-slate-400 hover:text-light-blue"/>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <InputError message={errors.genre} className=""/>
                    </div>
                    <div className="flex-1">
                        <InputLabel htmlFor="publisher" value='Book Publisher' className="text-xl mb-2"/>
                        <FilterDropdown
                            options={publishers.map(p => p.publisher_name)}
                            value={selectPublisher}
                            setvalue={setPublisher}
                            above={true}
                            fullWidth={true}
                            includeAll={false}
                        />
                        <InputError message={errors.publisher} className="mt-2"/>
                    </div>
                    <div>
                        <InputLabel htmlFor="page" value='Book Pages' className="text-xl mb-2"/>
                        <TextInput id="page" type="number" name="page" className="mt-1 block w-full" onChange={e => setData('page', e.target.value)} value={data.page}/>
                        <InputError message={errors.page} className="mt-2"/>
                    </div>
                    <div>
                        <InputLabel htmlFor="date" value='Book Publish Date' className="text-xl mb-2"/>
                        <TextInput id="date" type="date" name="date" className="mt-1 block w-full" onChange={e => setData('publish_date', e.target.value)} value={data.publish_date}/>
                        <InputError message={errors.publish_date} className="mt-2"/>
                    </div>
                    <PrimaryButton className="w-full py-4 mt-4">Edit this Book</PrimaryButton>
                </div>
            </form>
        </AdminLayout>
    );
}

export default EditBook;
