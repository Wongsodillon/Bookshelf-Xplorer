export interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    email_verified_at: string;
    profile_pic_url: string;
    status: number;
    about: string;
    followers_count: number;
    read_books_count: number;
    following_count: number;
    followed: User[];
    followers: Following[];
    following: Following[];
    role: string;
}

export interface Following {
    follower_id: number;
    following_id: number;
    
    created_at: string;
    updated_at: string;
}

export interface UserDetails extends User {
    created_at: string;
    updated_at: string;
    follower_count: number;
    following_count: number;
    review_count: number;
    read_books_count: number;
    read_list_count: number;
    lists_count: number;
    ratings_count: number;
    likes_count: number;
    review: Review[];
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    list: List;
    book: Books;
};

export type ModalProps = {
    show: boolean;
    onClose: CallableFunction;
    closeable?: boolean;
}

export type Genres = {
    id: number,
    genre_name: string,
    created_at: Date,
    updated_at: Date
}

export type Publishers = {
    id: number,
    publisher_name: string,
    created_at: Date,
    updated_at: Date
}

export type RatingPivot = {
    book_id: number;
    user_id: number;
    rating: number;
    created_at: string;
    updated_at: string;
}

export type Rating = {
    rating: number;
    rating_pivot: RatingPivot;
}

export type RatingCount = {
    rating: number;
    ratingCount: number;
}

export type ReadList = {
    book_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export type Review = {
    id: number;
    book_id: number;
    user_id: number;
    rating: number;
    review: string;
    created_at: string;
    updated_at: string;
    has_spoiler: number;
    user: User;
    liked: User;
    likes_count: number;
    book: Books;
}

export type LikedReview = {
    review_id: number;
    user_id: number;
    review: Review;
    created_at: string;
    updated_at: string;
}

export type Books = {
    id: number,
    book_title: string,
    book_author: string,
    book_cover_url: string,
    book_description: string,
    book_publish_date: string,
    book_page: number,
    genres: Genres[],
    publisher: Publishers,
    ratings: Rating[],
    rating: RatingPivot,
    user_rating: RatingPivot;
    user_like: User,
    user_read_list: ReadList,
    user_read_book: User,
    user_review: Review;
    reviews: Review[],
}

export type BooksPageProps = PageProps & {
    books: Books[];
    genres: Genres[];
    publishers: Publishers[];
}

export type List = {
    id: number;
    list_name: string;
    list_description: string;
    user_id: number;
    user: User;
    is_public: number | boolean;
    created_at: string;
    updated_at: string;
    list_details: ListDetails[];
    user_like: User;
    liked_lists_count: number;
}

export type ListDetails = {
    list_id: number;
    book_id: number;
    order: number;
    created_at: string;
    updated_at: string;
    book: Books;
}
