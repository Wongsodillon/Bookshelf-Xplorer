import MainLayout from "@/Layouts/MainLayout";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import { useState, useEffect } from "react";
import { Books, List, PageProps, Review } from "@/types";
import { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { FaStar } from "react-icons/fa";
import { calcRating } from "@/Utils/util";
import { HiOutlineStar } from "react-icons/hi2";
import RatingModal from "@/Components/Modal/RatingModal";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import SecondaryButton from "@/Components/UI/SecondaryButton";
import BookReviews from "@/Components/BookReviews";
import AddToListModal from "@/Components/Modal/AddToListModal";
import { useToast } from "@/Hooks/useToast";

type BookDetailsProps = PageProps & {
    book: Books;
    reviews: Review[];
    lists: List[];
}

const BookDetails = ({ auth, book, reviews, lists }: BookDetailsProps) => {

    const [showRatingModal, setShowRatingModal] = useState(false)
    const [showAddToListModal, setShowAddToListModal] = useState(false)

    const { toast, toastError, toastSuccess } = useToast()

    const { post:postReadlist, delete:removeReadlist } = useForm({
        book_id: book.id,
        user_id: auth.user.id
    })

    const { post:postRead, delete:removeRead } = useForm({
        book_id: book.id,
        user_id: auth.user.id
    })

    const { data:like, post:postLike, delete:removeLike } = useForm({
        book_id: book.id,
        user_id: auth.user.id
    })

    const openRatingModal = () => setShowRatingModal(true)

    const closeRatingModal = () => setShowRatingModal(false)

    const openAddToListModal = () => {
        setShowAddToListModal(true)
    }

    const closeAddToListModal = () => {
        setShowAddToListModal(false)
    }

    const addToReadList: FormEventHandler = e => {
        e.preventDefault()
        postReadlist(route('readlist.add', { id: book.id }), {
            preserveScroll: true,
            onSuccess: () => toastSuccess("Book added to Readlist!")
        })
    }

    const removeFromReadList: FormEventHandler = e => {
        e.preventDefault()
        removeReadlist(route('readlist.remove', { id: book.id }), {
            preserveScroll: true,
            onSuccess: () => toastSuccess("Book removed from Readlist!")
        })
    }

    const likeBook: FormEventHandler = e => {
        e.preventDefault()
        postLike(route('likes.add', { id: book.id }), {
            preserveScroll: true,
            onSuccess: () => toastSuccess("Book liked!")
        })
    }

    const unlikeBook: FormEventHandler = e => {
        e.preventDefault()
        removeLike(route('likes.remove', { id: book.id }), {
            preserveScroll: true,
            onSuccess: () => toastSuccess("Book unliked!")
        })
    }

    const markAsRead: FormEventHandler = e => {
        e.preventDefault()
        postRead(route('readbooks.add', { id: book.id }), {
            preserveScroll: true,
            onSuccess: () => toastSuccess("Book marked as read!")
        })
    }

    const markAsUnread: FormEventHandler = e => {
        e.preventDefault()
        removeRead(route('readbooks.remove', { id: book.id }), {
            preserveScroll: true,
            onSuccess: () => toastSuccess("Book marked as unread!"),
            onError: () => toastError("Can't mark book as unread if there is activity on it")
        })
    }

    return (
        <MainLayout user={auth.user}
        >
            <div className="py-8 px-4 sm:px-8 text-white">
                <div className="max-w-6xl mx-auto py-6 px-6 lg:py-8 lg:px-8 bg-dark-blue shadow-sm sm:rounded-lg">
                    <div className="flex flex-col sm:flex-row gap-8">
                        <div className='w-full h-full sm:w-48 sm:h-76 cursor-pointer'>
                            <img src={book.book_cover_url} alt="Book" className="object-fit w-full h-full" />
                        </div>
                        <div className="flex-1 flex flex-col gap-3">
                            <div className="flex flex-col md:flex-row md:justify-between items-start gap-4 md:items-center">
                                <p className="text-3xl font-bold">{book.book_title}</p>
                                <div className="flex gap-4">
                                    { book.ratings &&
                                        <div className="flex gap-2 items-center">
                                            <FaStar className="text-orange-400" size={25}/>
                                            <p className="text-xl">{calcRating(book)}/5</p>
                                        </div>
                                    }
                                    <div onClick={openRatingModal} className="flex gap-2 p-1 items-center cursor-pointer rounded-sm transition-all duration-200">
                                        {
                                            book.user_rating?.rating ? (
                                                <>
                                                    <FaStar className="text-light-blue" size={25}/>
                                                    <p className="text-xl font-bold text-light-blue hover:text-light-blue-hover">{book.user_rating.rating}/5</p>
                                                </>
                                            ) : (
                                                <>
                                                    <HiOutlineStar className="text-light-blue" size={25}/>
                                                    <p className="text-xl font-bold text-light-blue hover:text-light-blue-hover">Rate</p>
                                                </>
                                            )
                                        }
                                    </div>
                                    <RatingModal show={showRatingModal} onClose={closeRatingModal} book={book} userRating={book.user_rating}/>
                                    <form onSubmit={book.user_like ? unlikeBook : likeBook}>
                                        {
                                            book.user_like ? (
                                                <SecondaryButton type="submit" className="hover:border-danger">
                                                    <IoMdHeart className="text-danger" size={22}/>
                                                    <p className="text-md ml-1 font-bold text-danger">Liked</p>
                                                </SecondaryButton>
                                            ) : (
                                                <SecondaryButton type="submit" className="hover:border-danger">
                                                    <IoIosHeartEmpty className="text-danger" size={22}/>
                                                    <p className="text-md ml-1 font-bold text-danger">Like</p>
                                                </SecondaryButton>
                                            )
                                        }
                                    </form>
                                </div>
                            </div>
                            <p className="text-xl">{book.genres.map(genre => genre.genre_name).join(', ')}</p>
                            <p className="text-xl">Written by {book.book_author}</p>
                            <p>{book.book_description}</p>
                            <p>Published by {book.publisher.publisher_name}</p>
                            <div className="flex min-w-full gap-4 flex-wrap">
                                { book.user_read_list ? (
                                    <form onSubmit={removeFromReadList}>
                                        <SecondaryButton className="py-4" type="submit">
                                            Remove from Readlist
                                        </SecondaryButton>
                                    </form>
                                ) : (
                                    <form onSubmit={addToReadList}>
                                        <PrimaryButton className="py-4">
                                            Add to Readlist
                                        </PrimaryButton>
                                    </form>
                                )}
                                { book.user_read_book ? (
                                    <form onSubmit={markAsUnread}>
                                        <SecondaryButton className="py-4" type="submit">
                                            Mark as Unread
                                        </SecondaryButton>
                                    </form>
                                ) : (
                                    <form onSubmit={markAsRead}>
                                        <SecondaryButton type="submit" className="py-4 text-white">
                                            Mark as Read
                                        </SecondaryButton>
                                    </form>
                                )}
                                <PrimaryButton className="bg-zinc-400 py-4 w-full sm:w-auto hover:bg-zinc-400 focus:bg-zinc-500 active:bg-zinc-500 focus:ring-zinc-500 text-dark-blue hover:text-white" onClick={openAddToListModal}>
                                    Add to My List
                                </PrimaryButton>
                                <AddToListModal show={showAddToListModal} onClose={closeAddToListModal} lists={lists} book={book}/>
                            </div>
                        </div>
                    </div>
                    <br />
                    <BookReviews reviews={reviews} book={book} />
                </div>
            </div>
        </MainLayout>
    );
}

export default BookDetails;
