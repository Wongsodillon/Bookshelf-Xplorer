<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\FollowingController;
use App\Http\Controllers\LikedListsController;
use App\Http\Controllers\LikedReviewsController;
use App\Http\Controllers\LikesController;
use App\Http\Controllers\ListController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\ReadBooksController;
use App\Http\Controllers\ReadListController;
use App\Http\Controllers\SettingsController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\EnsureListBelongsToUser;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Books
Route::get('/books', [BookController::class, 'BooksPage'])->name('books.index');
Route::get('/all-books/{request_count}', [BookController::class, 'AllBooks'])->name('books.all');
Route::get("/", [BookController::class, 'Dashboard'])->name('dashboard');
Route::get('/books/{id}', [BookController::class, "BookDetails"])->name('book.details');
Route::get('/search-books/{search}', [BookController::class, 'Search'])->name('search');
Route::match(['get', 'post'], '/search/{search}', [BookController::class, 'SearchPage'])->name('search');
Route::get('/lists', [ListController::class, 'GetLists'])->name('lists.index');

// ReadList
Route::middleware("auth")->group(function() {
    Route::get('/profile/{username}/readlist', [ReadListController::class, 'GetReadList'])->name('readlist.index');
    Route::post("/readlist/{id}", [ReadListController::class, "AddToReadList"])->name("readlist.add");
    Route::delete("/readlist/{id}", [ReadListController::class, "RemoveFromReadList"])->name("readlist.remove");
});

// Lists
Route::middleware("auth")->group(function() {
    Route::get('/profile/{username}/lists', [ListController::class, 'GetMyLists'])->name('my-lists.index');
    Route::get('profile/my-lists/edit/{id}', [ListController::class, 'EditList'])->name('lists.edit')->middleware(EnsureListBelongsToUser::class);
    Route::post('/my-list/create', [ListController::class, 'CreateList'])->name('lists.create');
    Route::get('/profile/{username}/liked/lists', [ListController::class, 'GetLikedLists'])->name('lists.liked');
    Route::patch('my-list/edit{id}', [ListController::class, 'UpdateList'])->name('lists.update');
    Route::delete('my-list/{id}', [ListController::class, 'DeleteList'])->name('lists.delete');
    Route::get('/lists/{id}', [ListController::class, 'ListDetails'])->name('lists.details');
    Route::post('/list/add', [ListController::class, 'AddToList'])->name('lists.add');
});

// Ratings and Reviews
Route::middleware("auth")->group(function() {
    Route::get('/reviews/{id}', [RatingController::class, 'BookReviews'])->name('reviews.book');
    Route::get('/your-review/{id}', [RatingController::class, 'UserBookReview'])->name('reviews.yours');
    Route::post("/ratings/{id}", [RatingController::class, "AddRating"])->name('ratings.add');
    Route::post('/reviews/{id}', [RatingController::class, 'AddReview'])->name('reviews.add');
    Route::delete('/reviews/{id}', [RatingController::class, 'DeleteRating'])->name('reviews.delete');
    Route::get('/profile/{username}/liked/reviews', [RatingController::class, 'GetLikedReviews'])->name('reviews.liked');
    Route::get('/profile/{username}/reviews', [RatingController::class, 'GetUserReviews'])->name('reviews.user');
    Route::delete('delete-review', [RatingController::class, 'DeleteReview'])->name('review.delete');
});

// Likes
Route::middleware("auth")->group(function() {
    Route::post('/likes/{id}', [LikesController::class, 'LikeBook'])->name('likes.add');
    Route::delete("/likes/{id}", [LikesController::class, 'UnlikeBook'])->name('likes.remove');
});

// ReadBooks
Route::middleware("auth")->group(function() {
    Route::post("/readbooks/{id}", [ReadBooksController::class, "AddToReadBooks"])->name("readbooks.add");
    Route::delete("/readbooks/{id}", [ReadBooksController::class, "RemoveFromReadBooks"])->name("readbooks.remove");
});

// Profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/settings', [SettingsController::class, 'edit'])->name('profile.edit');
    Route::patch('/settings', [SettingsController::class, 'update'])->name('profile.update');
    Route::delete('/settings', [SettingsController::class, 'destroy'])->name('profile.destroy');
    Route::get('/profile/liked', [ProfileController::class, 'liked'])->name('profile.liked');
    Route::get('/profile/{username}', [ProfileController::class, 'UserProfile'])->name('profile.user');
    Route::get('profile/{username}/books', [ProfileController::class, 'GetReadBooks'])->name('profile.books');
});

// LikedLists
Route::middleware('auth')->group(function() {
    Route::post('/likedlists', [LikedListsController::class, 'LikeList'])->name('likedlists.add');
    Route::delete('/likedlists', [LikedListsController::class, 'UnlikeList'])->name('likedlists.remove');
});

// LikedReviews
Route::middleware('auth')->group(function() {
    Route::post('/likedreviews', [LikedReviewsController::class, 'LikeReview'])->name('review.like');
    Route::delete('/likedreviews', [LikedReviewsController::class, 'UnlikeReview'])->name('review.unlike');
});

// Following
Route::middleware('auth')->group(function() {
    Route::get('/following/{username}', [FollowingController::class, 'GetFollowing'])->name('following');
    Route::get('/followers/{username}', [FollowingController::class, 'GetFollowers'])->name('followers');
    Route::post('/follow', [FollowingController::class, 'FollowUser'])->name('follow');
    Route::delete('/unfollow', [FollowingController::class, 'UnfollowUser'])->name('unfollow');
});

// Admin
Route::middleware(['auth', AdminMiddleware::class])->group(function() {
    Route::get('/admin', [AdminController::class, 'AdminDashboard'])->name('admin.dashboard');
    Route::get('/admin/add-book', [AdminController::class, 'AddNewBook'])->name('admin.add-book');
    Route::get('/admin/users', [AdminController::class, 'GetUsers'])->name('admin.users');
    Route::post('admin/add-book', [BookController::class, 'InsertBook'])->name('admin.insert');
    Route::delete('admin/delete-book', [BookController::class, 'DeleteBook'])->name('admin.delete');
    Route::get('admin/edit-book/{id}', [AdminController::class, 'EditBook'])->name('admin.edit');
    Route::post('admin/edit-book/{id}', [BookController::class, 'UpdateBook'])->name('admin.update');
    Route::post('admin/ban/{id}', [AdminController::class, 'BanUser'])->name('admin.ban');
    Route::post('admin/unban/{id}', [AdminController::class, 'UnbanUser'])->name('admin.unban');
    Route::get('admin/users/{username}', [AdminController::class, 'UserDetails'])->name('admin.user');
});

require __DIR__.'/auth.php';
