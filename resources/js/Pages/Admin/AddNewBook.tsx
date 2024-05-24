import { useEffect, useState, useCallback, FormEventHandler } from "react"
import { useDropzone } from "react-dropzone"
import AdminLayout from "@/Layouts/AdminLayout"
import { Genres, PageProps, Publishers } from "@/types"
import TextInput from "@/Components/UI/TextInput"
import TextArea from "@/Components/UI/TextArea"
import InputLabel from "@/Components/UI/InputLabel"
import InputError from "@/Components/UI/InputError"
import FilterDropdown from "@/Components/FilterDropdown"
import { IoMdClose } from "react-icons/io"
import PrimaryButton from "@/Components/UI/PrimaryButton"
import { useForm } from "@inertiajs/react"
import Dropzone from "@/Components/Dropzone"

type AddNewBookProps = PageProps & {
    genres: Genres[]
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

const AddNewBook = ({ auth, genres, publishers }: AddNewBookProps) => {

    const [selectPublisher, setPublisher] = useState<string>('Publisher')
    const [genre, setGenre] = useState<string>('Genre')
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])

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

    const { data, setData, post, processing, errors, reset } = useForm<BookInput>({
        book_title: '',
        author: '',
        desc: '',
        genre: [],
        publisher: '',
        page: '',
        publish_date: '',
        image: null,
    })

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
        post(route('admin.insert'))
    }

    return (
        <AdminLayout user={auth.user} header="Add New Book">
            <form className="flex p-6 bg-white rounded-md flex-col sm:flex-row gap-8" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 items-center">
                    <Dropzone onDrop={onDrop} />
                    <InputLabel value="Book Cover" className="text-xl"/>
                    <InputError message={errors.image} className=""/>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <div>
                        <InputLabel htmlFor="title" value='Book Title' className="text-xl mb-2"/>
                        <TextInput id="title" type="text" name="title" className="mt-1 block w-full" onChange={e => setData('book_title', e.target.value)} />
                        <InputError message={errors.book_title} className="mt-2"/>
                    </div>
                    <div>
                        <InputLabel htmlFor="author" value='Book Author' className="text-xl mb-2"/>
                        <TextInput id="author" type="text" name="author" className="mt-1 block w-full" onChange={e => setData('author', e.target.value)}/>
                        <InputError message={errors.author} className="mt-2"/>
                    </div>
                    <div>
                        <InputLabel htmlFor="desc" value='Book Description' className="text-xl mb-2"/>
                        <TextArea id="desc" name="desc" className="mt-1 block w-full h-48" onChange={e => setData('desc', e.target.value)}/>
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
                                <div key={i} className="bg-gray-100 rounded-md py-3 px-4 text-sm flex items-center gap-2">
                                    <p className="text-lg">{g}</p>
                                    <button className="cursor-pointer" onClick={() => handleRemoveGenre(g)} type="button">
                                        <IoMdClose size={24} className="text-gray-600 hover:text-black"/>
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
                        <TextInput id="page" type="number" name="page" className="mt-1 block w-full" onChange={e => setData('page', e.target.value)}/>
                        <InputError message={errors.page} className="mt-2"/>
                    </div>
                    <div>
                        <InputLabel htmlFor="date" value='Book Publish Date' className="text-xl mb-2"/>
                        <TextInput id="date" type="date" name="date" className="mt-1 block w-full" onChange={e => setData('publish_date', e.target.value)}/>
                        <InputError message={errors.publish_date} className="mt-2"/>
                    </div>
                    <PrimaryButton className="w-full py-4 mt-4">Add Book</PrimaryButton>
                </div>
            </form>
        </AdminLayout>
    )
}

export default AddNewBook
