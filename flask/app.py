from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS
from recommender import BookRecommender

app = Flask(__name__)
CORS(app)



@app.route("/recommend-books", methods=["POST"])
def recommend():
    book_recommender = BookRecommender(db_config={
        'user': 'root',
        'password': 'nRnGBssJToqexDRxUHzrforYFxfzQXWn',
        'host': 'viaduct.proxy.rlwy.net',
        'database': 'railway',
        'port':19175
    })
    data = request.get_json()
    user_id = data['user_id']
    recommendation, favorite_books = book_recommender.recommend(user_id=user_id)
    recommendation = [str(book_id) for book_id in recommendation]
    return jsonify({
        'recommendation': recommendation,
        'favorite': favorite_books
    })

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
