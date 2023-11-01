from app.models import db, GuitarImage, Guitar, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
import random

fake = Faker()

def image_url_generator():
    width = 350
    height = 400
    image_id = fake.random_int(min=1, max=1000)
    return f"https://picsum.photos/400/300?image={image_id}"

def seed_guitar_images():
    guitars = Guitar.query.all()

    for guitar in guitars:
        for _ in range(5):

            guitar_image = GuitarImage(
                guitar_id = guitar.id,
                url = image_url_generator()
            )

            db.session.add(guitar_image)


    db.session.commit()



def undo_guitar_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.guitar_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM guitar_images"))

    db.session.commit()
