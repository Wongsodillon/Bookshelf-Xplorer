import { Books } from "@/types";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { router } from "@inertiajs/react";
import Overlay from "./UI/Overlay";
import { calcRating } from "@/Utils/util";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "../Styles/custom.css";

const BookSlider = ({ books }: { books: Books[] }) => {

    const handleClick = (id: number) => {
        router.visit(`/books/${id}`)
    }

    if (!books || books.length == 0) return (
        <div className="w-full h-60 flex justify-center items-center">
            <p className="text-gray-500 text-2xl">No books to display</p>
        </div>
    )

    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={30}
            slidesPerView={5}
            breakpoints={{
                320: {
                    slidesPerView: 2,
                    spaceBetween: 24
                },
                480: {
                    slidesPerView: 3,
                        spaceBetween: 16
                    },
                800: {
                    slidesPerView: 4,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 20
                }
            }}
        >
            {books.map(book => (
                <SwiperSlide key={book.id} onClick={() => handleClick(book.id)} className='book-container w-full relative overflow-hidden hover:cursor-pointer'>
                    <div className='h-56 md:h-72 lg:h-80'>
                        <img src={book.book_cover_url} alt="Book" className="object-fit w-full h-full rounded-md" />
                    </div>
                    <Overlay>
                        <p className="text-white text-center text-sm lg:text-xl md:text-base">{book.book_title}</p>
                        <br />
                        <p className="text-white text-center text-xs lg:text-base md:text-sm">Genre: {book.genres.map(genre => genre.genre_name).join(', ')}</p>
                        {book.ratings && <p className="text-white text-center text-xs lg:text-base md:text-sm mt-2">Rating: {calcRating(book)}/5</p>}
                    </Overlay>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default BookSlider;
