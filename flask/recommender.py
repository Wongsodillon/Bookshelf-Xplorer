import mysql.connector
import pandas as pd
import numpy as np
import random
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors

class BookRecommender:
    def __init__(self, db_config):
        self.connection = mysql.connector.connect(**db_config)
        self.ratings = None
        self.books = None
        self.matrix = None
        self.user_mapper = None
        self.book_mapper = None
        self.user_inv_mapper = None
        self.book_inv_mapper = None
        self.book_query = '''
            SELECT id as book_id, book_title from books
        '''
        self.rating_query = '''
            SELECT *
            FROM ratings
            ORDER BY updated_at DESC
        '''

    def fetch_ratings_and_books(self):
        ratings = pd.read_sql(self.rating_query, self.connection)
        books = pd.read_sql(self.book_query, self.connection)
        books.to_csv('books.csv')
        ratings.to_csv('ratings.csv')
        return ratings, books

    def create_matrix(self, ratings):
        N = len(ratings['user_id'].unique())
        M = len(ratings['book_id'].unique())

        user_mapper = dict(zip(np.unique(ratings['user_id']), list(range(N))))
        book_mapper = dict(zip(np.unique(ratings['book_id']), list(range(M))))

        user_inv_mapper = dict(zip(list(range(N)), np.unique(ratings['user_id'])))
        book_inv_mapper = dict(zip(list(range(M)), np.unique(ratings['book_id'])))

        user_index = [user_mapper[i] for i in ratings['user_id']]
        book_index = [book_mapper[i] for i in ratings['book_id']]

        matrix = csr_matrix((ratings['rating'], (book_index, user_index)), shape=(M, N))

        return matrix, user_mapper, book_mapper, user_inv_mapper, book_inv_mapper

    def find_similar_books(self, book_id, k, metric='cosine', show_distance=False):
        neighbour_ids = []

        book_index = self.book_mapper[book_id]
        book_vector = self.matrix[book_index]
        k += 1
        kNN = NearestNeighbors(n_neighbors=k, algorithm="brute", metric=metric)
        kNN.fit(self.matrix)
        neighbour = kNN.kneighbors(book_vector, return_distance=show_distance)
        for i in range(1, k):
            n = neighbour.item(i)
            neighbour_ids.append(self.book_inv_mapper[n])
        neighbour_ids.pop(0)
        return neighbour_ids

    def recommend(self, user_id, k=8):
        self.ratings, self.books = self.fetch_ratings_and_books()
        self.matrix, self.user_mapper, self.book_mapper, self.user_inv_mapper, self.book_inv_mapper = self.create_matrix(self.ratings)

        df = self.ratings[self.ratings['user_id'] == user_id]
        if df.empty:
            return []

        rated_books = set(df['book_id'])

        favorite_books = df[df['rating'] == max(df['rating'])]['book_id']
        similar_ids = []

        for book in favorite_books:
            similar_ids += self.find_similar_books(book, k)

        similar_ids = list(set(similar_ids) - rated_books)
        random.shuffle(similar_ids)
        return similar_ids, favorite_books.tolist()

    def close_connection(self):
        self.connection.close()

recommender = BookRecommender(db_config={
    'user': 'root',
    'password': '',
    'host': '127.0.0.1',
    'database': 'bookshelf_xplorer'
})
print(recommender.recommend(user_id=1))
