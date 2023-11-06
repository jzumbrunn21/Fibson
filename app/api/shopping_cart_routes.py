from flask import Blueprint, request, jsonify
from app.models import db, ShoppingCart, CartItem
from flask_login import current_user, login_required


cart_routes = Blueprint("cart", __name__)



@cart_routes.route('/<int:id>')
@login_required
def view_shopping_cart(id):
    cart = ShoppingCart.query.get(id == current_user.id)
    items = CartItem.query.filter_by(cart_id=cart.id).all()
    items_to_dict = items.to_dict()


    return {"cart": items_to_dict}

@cart_routes.route('/<int:id>/add/<int:guitar_id>', methods=['POST'])
@login_required
def add_to_cart(id, guitar_id):
    shopping_cart = ShoppingCart.query.get(id == current_user.id)
    cart_item = CartItem(
        cart_id = shopping_cart.id,
        guitar_id = guitar_id,
        quantity = 1
    )

    db.session.add(cart_item)
    db.session.commit()

    return cart_item.to_dict(), 201
