from flask import Blueprint, jsonify, request, redirect, render_template
from app.models import db, Guitar
# Forms need importing
from app.forms import GuitarForm
listings_routes = Blueprint("listings", __name__)



@listings_routes.route('/')
def all_listings():
    listings = Guitar.query.all()

    response = [listings.to_dict() for listing in listings]
    return {'listings': response}
