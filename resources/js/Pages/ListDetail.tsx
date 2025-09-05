import MainLayout from '@/Layouts/MainLayout';
import { List, Books, ListDetails, PageProps } from '@/types';
import BookCard from '@/Components/Cards/BookCard';
import useFilter from '@/Hooks/useFilter';
import FilterDropdown from '@/Components/FilterDropdown';
import { useState, useEffect, FormEventHandler } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/UI/PrimaryButton';

type ListProps = PageProps & {
    list: List;
    books: ListDetails[];
}

const ListDetail = ({ auth, list, books }: ListProps) => {

    const [isMine, setIsMine] = useState(false)

    const { post:postLike, delete:deleteLike } = useForm({
        list_id: list.id,
        user_id: auth.user.id
    })

    const likeList: FormEventHandler = e => {
        e.preventDefault()
        postLike(route('likedlists.add'))
    }

    const unlikeList: FormEventHandler = e => {
        e.preventDefault()
        deleteLike(route('likedlists.remove'))
    }

    useEffect(() => {
        if (auth.user.id === list.user.id) {
            setIsMine(true)
        }
    }, [auth.user, list.user])

    return (
        <MainLayout user={auth.user}>
            <div className='py-8 px-4 sm:px-8'>
                <div className='max-w-6xl mx-auto py-6 px-6 lg:py-8 lg:px-16 shadow sm:rounded-lg'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-3xl font-bold'>{list.list_name}</p>
                        <p className='text-md text-gray-500'>List by <Link href={route('profile.user', { username: list.user.username })} className='font-bold'>{list.user.name}</Link></p>
                        <p className='text-md'>{list.list_description}</p>
                    </div>
                    <br />
                    <div className='flex gap-4 items-center'>
                        { isMine ?
                            <>
                                <PrimaryButton className='py-4' onClick={() => router.visit(`/my-lists/edit/${list.id}`)}>
                                    Edit List
                                </PrimaryButton>
                                <PrimaryButton className='py-4'>
                                    Add a new book
                                </PrimaryButton>
                            </>
                            :
                            ( list.user_like ?
                                <form onSubmit={unlikeList}>
                                    <PrimaryButton className='py-4'>
                                        You like this list
                                    </PrimaryButton>
                                </form>
                                :
                                <form onSubmit={likeList}>
                                    <PrimaryButton className='py-4'>
                                        Like this list
                                    </PrimaryButton>
                                </form>
                            )
                        }
                        <p className='text-gray-500'>{`${list.liked_lists_count} users liked this list`}</p>
                    </div>
                    <br />
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3">
                        {books.map(book => (
                            <BookCard key={book.book_id} book={book.book} className={'w-full'} />
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default ListDetail
