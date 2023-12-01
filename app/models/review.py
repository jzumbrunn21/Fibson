from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    guitar_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('guitars.id')), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    stars = db.Column(db.Integer, nullable=False)


    user = db.relationship(
        'User',
        back_populates='reviews'
    )


    guitar = db.relationship(
        'Guitar',
        back_populates='reviews'
    )


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'username': self.user.username,
            'guitar_id': self.guitar_id,
            'description': self.description,
            'stars': self.stars
        }
