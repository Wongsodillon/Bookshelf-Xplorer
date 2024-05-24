import { RatingCount } from "@/types";

const RatingBar = ({ percentage }: { percentage: RatingCount }) => {

    const { rating, ratingCount } = percentage

    const percentageStyle = {
        width: `${ratingCount}%`,
        height: "100%",
        borderRadius: "10px",
        backgroundColor: "orange",
        transition: "width 0.5s ease-in-out"
    }

    return (

        <div className='flex items-start mb-4'>
            <p className="whitespace-nowrap mr-4 md:text-base text-xs">{rating} Star</p>
            <div className="md:max-w-90 w-full h-5 lg:h-7 rounded-xl bg-gray-400 relative">
                <div className="bar-fill" style={percentageStyle}></div>
            </div>
            <p className="whitespace-nowrap w-5 ml-4 md:text-sm text-xs">{ratingCount.toFixed(1)}%</p>
        </div>
    );
}

export default RatingBar;
