<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Genre;
use App\Models\Lists;
use App\Models\User;
use App\Models\Publisher;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BookController extends Controller
{
    public function BooksPage()
    {
        $books = Book::with(['genres', 'publisher', 'ratings'])->get();
        $genres = Genre::all();
        $publishers = Publisher::all();
        return Inertia::render('BooksPage', ['books' => $books, 'genres' => $genres, 'publishers' => $publishers]);
    }

    public function AllBooks(Request $request)
    {
        $requestCount = $request->request_count;
        $books = Book::with(['genres', 'publisher'])->limit($requestCount)->get();
        return response()->json($books);
    }

    public function DashBoard()
    {
        $user = Auth::user();
        $recommendations = Book::with(['genres', 'ratings'])->inRandomOrder()->take(8)->get();
        $topRated = Book::with(['genres', 'ratings'])
            ->join('ratings', 'books.id', '=', 'ratings.book_id')
            ->select('books.*', DB::raw('AVG(ratings.rating) as avg_rating'))->orderByDesc('avg_rating')
            ->groupBy('books.id', 'books.book_title', 'books.book_author', 'books.book_description', 'books.book_cover_url', 'books.book_publish_date', 'books.book_page', 'books.publisher_id', 'books.created_at', 'books.updated_at')
            ->take(8)->get();
        $mostLiked = Book::with(['genres', 'likes'])
            ->withCount('likes')
            ->orderByDesc('likes_count')
            ->take(8)
            ->get();
        if (!$user) {
            return Inertia::render('Dashboard', [
                'recommendations' => $recommendations,
                'topRated' => $topRated,
                'mostLiked' => $mostLiked,
                'recentlyViewed' => [],
            ]);
        }
        $recentlyViewed = Book::whereHas('recentlyViewed', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with(['genres', 'ratings'])->get();

        // $topRated = Book::with(['genres', 'ratings'])
        //     ->get();

        return Inertia::render('Dashboard', [
            'recommendations' => $recommendations,
            'recentlyViewed' => $recentlyViewed,
            'topRated' => $topRated,
            'mostLiked' => $mostLiked,
        ]);
    }

    public function Search($search) {
        $books = Book::with(['genres', 'publisher', 'ratings'])
        ->where('book_title', 'like', "%$search%")
        ->get();
        return $books;
    }

    public function SearchPage(Request $request) {
        $search = $request->search;
        $books = BookController::Search($search);
        $genres = Genre::all();
        $publishers = Publisher::all();
        return Inertia::render('SearchPage', ['search' => $search, 'books' => $books, 'genres' => $genres, 'publishers' => $publishers]);
    }

    public function BookDetails(Request $request) {
        $book = Book::with(['genres', 'publisher',  'ratings', 'userRating', 'userLike', 'userReadList', 'userReadBook', 'userReview'])->find($request->id);
        $reviews = RatingController::BookReviews($request->id);
        $userId = Auth::id();
        $lists = Lists::with(['ListDetails.Book'])->where('user_id', $userId)->get();
        return Inertia::render('BookDetails', [
            'book' => $book,
            'reviews' => $reviews,
            'lists' => $lists
        ]);
    }

    public function InsertBook(Request $request) {
        $messages = [
            'book_title.required' => 'The book title is required',
            'book_title.min' => 'The book title must be at least 2 characters',
            'book_title.max' => 'The book title must not be greater than 200 characters',
            'author.required' => 'The book author is required',
            'author.min' => 'The book author must be at least 5 characters',
            'author.max' => 'The book author must not be greater than 200 characters',
            'desc.required' => 'The book description is required',
            'desc.min' => 'The book description must be at least 25 characters',
            'desc.max' => 'The book description must not be greater than 500 characters',
            'publisher.required' => 'The publisher is required',
            'genre.required' => 'The genres are required',
            'genre.array' => 'The genres must be an array',
            'genre.min' => 'The book must have at least one genre',
            'page.required' => 'The book page is required',
            'page.integer' => 'The book page must be an integer',
            'page.min' => 'The book page must be at least 1',
            'image.required' => 'The book cover image is required',
            'image.image' => 'The book cover image must be an image',
            'image.mimes' => 'The book cover image must be a jpeg, png, or jpg',
            'image.max' => 'The book cover image must not be greater than 2MB',
            'publish_date.required' => 'The publish date is required',
            'publish_date.date' => 'The publish date must be a date',
            'publish_date.before' => 'The publish date must be before today',
        ];
        $rules = [
            "book_title" => 'required|min:2|max:200',
            "author" => 'required|min:5|max:200',
            "desc" => 'required|min:25|max:500',
            'publisher' => 'required|exists:publishers,publisher_name',
            'genre' => 'required|array|min:1',
            'genre.*' => 'exists:genres,genre_name',
            'page' => 'required|integer|min:1',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'publish_date' => 'required|date|before:today',
        ];
        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $publisherId = Publisher::where('publisher_name', $request->publisher)->first()->id;

        $genreIds = Genre::whereIn('genre_name', $request->genre)->pluck('id')->unique();
        $bookCoverUrl = $this->InsertFile($request->file('image'));

        $book = new Book();
        $book->book_title = $request->book_title;
        $book->book_author = $request->author;
        $book->book_description = $request->desc;
        $book->publisher_id = $publisherId;
        $book->book_page = $request->page;
        $book->book_publish_date = $request->publish_date;
        $book->book_cover_url = $bookCoverUrl;
        $book->save();

        foreach ($genreIds as $genreId) {
            $book->genres()->attach($genreId, ['created_at' => now(), 'updated_at' => now()]);
        }
        return redirect()->route('admin.dashboard');
    }

    public function InsertFile($file) {
        $fileName = time().'_'.$file->getClientOriginalName();
        Storage::putFileAs('public/books', $file, $fileName);
        return Storage::url('books/'.$fileName);
    }

    public function UpdateBook(Request $request) {
        $book = Book::find($request->id);
        $messages = [
            'book_title.required' => 'The book title is required',
            'book_title.min' => 'The book title must be at least 2 characters',
            'book_title.max' => 'The book title must not be greater than 200 characters',
            'author.required' => 'The book author is required',
            'author.min' => 'The book author must be at least 5 characters',
            'author.max' => 'The book author must not be greater than 200 characters',
            'desc.required' => 'The book description is required',
            'desc.min' => 'The book description must be at least 25 characters',
            'desc.max' => 'The book description must not be greater than 500 characters',
            'publisher.required' => 'The publisher is required',
            'genre.required' => 'The genres are required',
            'genre.array' => 'The genres must be an array',
            'genre.min' => 'The book must have at least one genre',
            'page.required' => 'The book page is required',
            'page.integer' => 'The book page must be an integer',
            'page.min' => 'The book page must be at least 1',
            'image.image' => 'The book cover image must be an image',
            'image.mimes' => 'The book cover image must be a jpeg, png, or jpg',
            'image.max' => 'The book cover image must not be greater than 2MB',
            'publish_date.required' => 'The publish date is required',
            'publish_date.date' => 'The publish date must be a date',
            'publish_date.before' => 'The publish date must be before today',
        ];
        $rules = [
            "book_title" => 'required|min:2|max:200',
            "author" => 'required|min:5|max:200',
            "desc" => 'required|min:25|max:500',
            'publisher' => 'required|exists:publishers,publisher_name',
            'genre' => 'required|array|min:1',
            'genre.*' => 'exists:genres,genre_name',
            'page' => 'required|integer|min:1',
            'publish_date' => 'required|date|before:today',
        ];
        if ($request->hasFile('image')) {
            $rules['image'] = 'image|mimes:jpeg,png,jpg|max:2048';
        }
        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $publisherId = Publisher::where('publisher_name', $request->publisher)->first()->id;
        $genreIds = Genre::whereIn('genre_name', $request->genre)->pluck('id')->unique();

        if ($request->hasFile('image')) {
            $bookCoverUrl = $this->InsertFile($request->file('image'));
            $this->DeleteFile($book->book_cover_url);
        } else {
            $bookCoverUrl = $book->book_cover_url;
        }

        $book->book_title = $request->book_title;
        $book->book_author = $request->author;
        $book->book_description = $request->desc;
        $book->publisher_id = $publisherId;
        $book->book_page = $request->page;
        $book->book_publish_date = $request->publish_date;
        $book->book_cover_url = $bookCoverUrl;
        $book->updated_at = now();
        $book->save();

        $book->genres()->detach();
        foreach ($genreIds as $genreId) {
            $book->genres()->attach($genreId, ['created_at' => now(), 'updated_at' => now()]);
        }
        return redirect()->route('admin.dashboard');
    }

    public function DeleteFile($path) {
        $path = str_replace('/storage', '', $path);
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }

    public function DeleteBook(Request $request) {
        $book = Book::find($request->id);
        $this->DeleteFile($book->book_cover_url);
        $book->delete();
        return redirect()->route('admin.dashboard');
    }

}
