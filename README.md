# Bookshelf Xplorer
**Bookshelf Xplorer** is a social reading platform where people can discover books, track what they have read, build custom themed lists, write reviews, and interact with other readers through follows and likes.

## Product Overview
Bookshelf Xplorer is designed as an end-to-end book community experience.

### What users can do
- Browse and search the catalog of books.
- Open detailed book pages with metadata, ratings, and reviews.
- Add books to a **Read List** (to-be-read) and a **Read Books** history.
- Rate books and write/delete reviews.
- Create personal curated lists, edit them, and add books to those lists.
- Like books, like reviews, and like community lists.
- Follow/unfollow other users and view followers/following.
- Visit user profiles to see public activity (reviews, books, lists, liked content).
- Use role-based admin features to manage books and moderate user access.

### Platform architecture at a glance
- **Backend:** Laravel (routing, auth, middleware, domain logic).
- **Frontend:** React + Inertia + TypeScript + Vite.
- **Data:** MySQL-backed relational schema via Laravel migrations.

## Data Model (Intentional, Not Exhaustive)
The data model centers around readers, books, and social interactions.

### Core entities
- **User**: account identity, authentication, profile.
- **Book**: title-level content users discover and interact with.
- **Genre / Publisher**: supporting metadata for organizing books.
- **Rating**: user-to-book score + review content.

### Reading-state and collection entities
- **ReadList**: books a user plans to read.
- **ReadBooks**: books a user has completed.
- **Lists**: custom user-authored collections (e.g., “Best Sci-Fi Starters”).
- **ListDetails**: join/line-item records connecting books to user lists.

### Social entities
- **Following**: user-to-user relationship graph.
- **Likes**: likes on books.
- **LikedReviews**: likes on review items.
- **LikedLists**: likes on custom list objects.
- **RecentlyViewed**: recent interaction history for profile/activity UX.

## What This Project Demonstrates (Explicit Signal)
This project demonstrates practical full-stack product engineering, including:

- **Domain modeling for social products:** multiple interaction types (ratings, lists, likes, follows) represented as clear relational entities.
- **Feature-rich REST/web routing in Laravel:** authenticated user flows, profile-driven pages, and admin-only routes protected with middleware.
- **Modern React-driven UI delivery with Inertia:** SPA-like UX while keeping server-side Laravel conventions.
- **Portfolio-ready product thinking:** not just CRUD, but engagement loops (discover → review → list → follow → recommend).

---

## Existing UI Screenshots

### Login
![LoginPage](https://github.com/Wongsodillon/Bookshelf-Xplorer/assets/81748327/93895eec-86a4-41c5-b769-e2b0adcbf511)

### Home
![Home](https://github.com/Wongsodillon/Bookshelf-Xplorer/assets/81748327/447a5424-d5d8-4c32-a20f-12a1d374b6ff)

### Books
![BooksPage](https://github.com/Wongsodillon/Bookshelf-Xplorer/assets/81748327/547098ae-7858-49e2-afec-03d679759cd0)
![BookDetails](https://github.com/Wongsodillon/Bookshelf-Xplorer/assets/81748327/de578cd9-4b25-4d2b-9811-c052f63b632f)

### Lists
![ListsPage](https://github.com/Wongsodillon/Bookshelf-Xplorer/assets/81748327/7e0fd78d-bb39-4342-886c-298dd35a8ba7)

### Profile
![Profile](https://github.com/Wongsodillon/Bookshelf-Xplorer/assets/81748327/443ef87d-ad06-4a4e-8f45-521554dc96a9)

### Read Books
![ReadBooks](https://github.com/Wongsodillon/Bookshelf-Xplorer/assets/81748327/0b96e045-9be8-4c4a-a6df-fa6fa5bc1b27)

### My Lists
![MyLists](https://github.com/Wongsodillon/Bookshelf-Xplorer/assets/81748327/5cbbc5e9-27bc-4633-a610-d0a4a4f08a54)

### Edit my List
![EditList](https://github.com/Wongsodillon/Bookshelf-Xplorer/assets/81748327/535d4bcc-e685-481e-b726-0dccb07be245)

### My Reviews
![ReviewsPage](https://github.com/Wongsodillon/Bookshelf-Xplorer/assets/81748327/11448212-2b50-459a-a2d0-05709ce1d787)

### Liked Reviews and Lists
![LikedReviewsLists](https://github.com/Wongsodillon/Bookshelf-Xplorer/assets/81748327/b33e9485-d0ba-4bb0-b0f1-1baab360f6d9)

### Admin
![AdminBooks](https://github.com/Wongsodillon/Bookshelf-Xplorer/assets/81748327/15e51819-ddd4-467f-9300-b524c84f0525)
![AdminAddBooks](https://github.com/Wongsodillon/Bookshelf-Xplorer/assets/81748327/f9ecc1a1-b4c3-4558-be3a-516b1bae4d1d)

### User Management
![AdminUsers](https://github.com/Wongsodillon/Bookshelf-Xplorer/assets/81748327/556856c6-0cf9-4cfa-8a2e-7f9e2ae4b6db)
![AdminUserDetails](https://github.com/Wongsodillon/Bookshelf-Xplorer/assets/81748327/77204cc8-b0ad-48c1-a82f-a335b67be138)

