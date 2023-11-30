from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review, User, Guitar
from app.forms import ReviewForm


reviews_routes = Blueprint('reviews', __name__)

#Reviews by guitar id
@reviews_routes.route('/listings/<int:id>')
def all_reviews(id):
    reviews = Review.query.filter_by(guitar_id=id).all()
    return {'reviews': [review.to_dict() for review in reviews]}

#Create Review by guitar id
@reviews_routes.route('/listings/<int:id>/create', methods=['POST'])
@login_required
def create_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review(
            user_id=current_user.id,
            guitar_id=id,
            description=form.data['description'],
            stars=form.data['stars']
        )

        db.session.add(review)
        db.session.commit()
        return review.to_dict(), 200
    else:
        return {'errors': form.errors}, 401


#Update Review by review id
@reviews_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def update_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        reviewUpdated = Review.query.get(id)

        reviewUpdated.description=form.data['description']
        reviewUpdated.stars=form.data['stars']

        db.session.add(reviewUpdated)
        db.session.commit()
        return reviewUpdated.to_dict(), 200
    else:
        return {'errors': form.errors}, 401

#Delete Review by review id
@reviews_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return {'message': 'Review deleted'}
