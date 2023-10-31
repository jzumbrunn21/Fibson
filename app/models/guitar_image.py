from .db import db, environment, SCHEMA, add_prefix_for_prod


class GuitarImage(db.Model):
    __tablename__ = 'guitar_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    guitar_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('guitars.id')))
    url = db.Column(db.String, nullable=False)

    guitar = db.relationship(
        'Guitar',
        back_populates='guitar_images'
    )



    def to_dict(self):
        return {
            'id': self.id,
            'guitar_id': self.guitar_id,
            'url': self.guitar_id
        }
