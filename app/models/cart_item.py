from .db import db, environment, SCHEMA, add_prefix_for_prod


class CartItem(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shopping_carts.id')))
    guitar_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('guitars.id')))
    quantity = db.Column(db.Integer, default=1)

    shopping_cart = db.relationship(
        'ShoppingCart',
        back_populates='cart_items'
    )

    guitar = db.relationship(
        'Guitar',
        back_populates='cart_items'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'cart_id': self.cart_id,
            'guitar_id': self.guitar_id,
            'quantity': self.quantity,
            'guitar': self.guitar.to_dict()
        }
