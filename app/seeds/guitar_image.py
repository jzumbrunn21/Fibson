from app.models import db, GuitarImage, Guitar, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
import random

fake = Faker()

def seed_guitar_images():
    guitars = Guitar.query.all()

    for guitar in guitars:
        for _ in range(5):

            guitar_image = GuitarImage(
                guitar_id = guitar.id,
                url = fake.image_url()
            )

            db.session.add(guitar_image)


    db.session.commit()



def undo_guitar_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.guitar_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM guitar_images"))

    db.session.commit()
