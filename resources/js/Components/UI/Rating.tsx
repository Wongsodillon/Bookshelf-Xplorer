import { FaStar, FaHeart  } from 'react-icons/fa';

const Rating = ({ count, like }: { count?: number, like: boolean }) => {


    const buildStars = () => {
        const stars = []
        let i = 0
        if (count) {
            for (i; i < count; i++) {
                stars.push(<FaStar className='text-orange-500 h-5' key={i} />)
            }
        }
        if (like) {
            stars.push(<FaHeart className='text-light-blue h-5 ml-1' key={i} />)
        }
        return stars
    }

    return (
        <div className='flex items-center gap-1'>
            {buildStars()}
        </div>
    );
}

export default Rating;
