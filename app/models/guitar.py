from .db import db, environment, SCHEMA, add_prefix_for_prod


class Guitar(db.Model):
    __tablename__ = 'guitars'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    merchant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    make = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    guitar_type = db.Column(db.String, nullable=False)
    body_type = db.Column(db.String, nullable=False)
    wood_type = db.Column(db.String, nullable=False)
    color = db.Column(db.String, nullable=False)
    pickup_type = db.Column(db.String, nullable=False)
    joint_type = db.Column(db.String, nullable=False)
    fretboard_material = db.Column(db.String, nullable=False)
    frets = db.Column(db.Integer, nullable=False)
    inlays = db.Column(db.String, nullable=False)
    handedness = db.Column(db.String, nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    pickguard = db.Column(db.Boolean, default=False)
    pickup_selector = db.Column(db.String, nullable=False)


    merchant = db.relationship(
        'User',
        back_populates='guitars'
    )

    guitar_images = db.relationship(
        'GuitarImage',
        back_populates='guitar',
        cascade='all, delete-orphan'
    )

    cart_items = db.relationship(
        'CartItem',
        back_populates='guitar',
        cascade='all, delete-orphan'
    )

    reviews = db.relationship(
        'Review',
        back_populates='guitar',
        cascade='all, delete-orphan'
    )



    def to_dict(self):
        return {
            'id': self.id,
            'merchant_id': self.merchant_id,
            'make': self.make,
            'model': self.model,
            'year': self.year,
            'price': self.price,
            'guitar_type': self.guitar_type,
            'body_type': self.body_type,
            'wood_type': self.wood_type,
            'color': self.color,
            'pickup_type': self.pickup_type,
            'joint_type': self.joint_type,
            'fretboard_material': self.fretboard_material,
            'frets': self.frets,
            'inlays': self.inlays,
            'handedness': self.handedness,
            'description': self.description,
            'pickguard': self.pickguard,
            'pickup_selector': self.pickup_selector
        }
