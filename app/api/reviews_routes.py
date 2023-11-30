from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review, User, Guitar
from app.forms import ReviewForm


reviews_routes = Blueprint('reviews', __name__)

@reviews_routes.route('/listings/<int:id>/reviews')
def all_reviews(id):
    reviews = Review.query.filter_by(Review.guitar_id == id).all()
    return {'reviews': [review.to_dict() for review in reviews]}
