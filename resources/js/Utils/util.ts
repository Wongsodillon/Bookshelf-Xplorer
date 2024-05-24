import { Books } from "@/types"

export const calcRating = (book: Books): number => {
    let total = 0

    if (book.ratings.length === 0) {
        return 0
    }

    book.ratings.forEach(rating => {
        if (rating.rating != null) {
            total += rating.rating
        }
    })

    const averageRating = total / book.ratings.length

    return parseFloat(averageRating.toFixed(1))
}

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const formattedDate = `${day} ${months[monthIndex]} ${year}`

    return formattedDate;
}
