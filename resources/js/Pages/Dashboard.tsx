import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { PageProps, Books, Genres, Publishers } from "@/types";
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import BookSlider from '@/Components/BookSlider';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "../Styles/custom.css";
import BookCard from '@/Components/Cards/BookCard';

type DashboardProps = PageProps & {
    favorites: Books[];
    recommendations: Books[];
    recentlyViewed: Books[];
    topRated: Books[];
    mostLiked: Books[];
};

export default function Dashboard({ auth, recommendations, favorites, recentlyViewed, topRated, mostLiked }: DashboardProps) {

    function generateMessage() {
        if (favorites.length === 0 && auth) {
            return "Sign in to like books and get recommendations.";
        }
        const selectedFavorites = favorites.slice(0, 2);

        const favoriteTitles = selectedFavorites.map(book => book.book_title);

        const favoriteTitlesString = favoriteTitles.join(' & ');

        return "Since you liked " + favoriteTitlesString;
    }

    return (
        <MainLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-8 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className='bg-white p-8 shadow-sm sm:rounded-lg'>
                        <p className='text-2xl font-semibold text-gray-800'>{generateMessage()}</p>
                        <br />
                        <BookSlider books={recommendations}/>
                    </div>
                    <br />
                    <div className='bg-white p-8 shadow-sm sm:rounded-lg'>
                        <p className='text-3xl font-semibold text-gray-800'>Top Rated</p>
                        <br />
                        <BookSlider books={topRated}/>
                    </div>
                    <br />
                    <div className='bg-white p-8 shadow-sm sm:rounded-lg'>
                        <p className='text-3xl font-semibold text-gray-800'>Most Liked</p>
                        <br />
                        <BookSlider books={mostLiked}/>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
