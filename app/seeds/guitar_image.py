from app.models import db, GuitarImage, Guitar, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
import random

fake = Faker()

def image_url_generator():
    image_id = fake.random_int(min=1, max=1000)
    return f"https://picsum.photos/350/380?image={image_id}"

def seed_guitar_images():
    guitars = Guitar.query.all()

    urls = [
        "https://assets.stickpng.com/thumbs/580b585b2edbce24c47b289e.png",
        "https://assets.stickpng.com/thumbs/580b585b2edbce24c47b289c.png",
        "https://assets.stickpng.com/thumbs/585aa8d74f6ae202fedf290b.png",
        "https://assets.stickpng.com/thumbs/580b585b2edbce24c47b28a0.png",
        "https://assets.stickpng.com/thumbs/580b585b2edbce24c47b28a4.png",
        "https://assets.stickpng.com/thumbs/580b585b2edbce24c47b28a6.png",
        "https://assets.stickpng.com/thumbs/580b585b2edbce24c47b289f.png",
        "https://assets.stickpng.com/thumbs/580b585b2edbce24c47b28a5.png",
        "https://assets.stickpng.com/thumbs/585aa89e4f6ae202fedf2909.png",
        "https://assets.stickpng.com/thumbs/585aa8bb4f6ae202fedf290a.png"
    ]

    for guitar in guitars:
        for _ in range(5):

            guitar_image = GuitarImage(
                guitar_id = guitar.id,
                # url = image_url_generator()
                url = random.choice(urls)
            )

            db.session.add(guitar_image)


    db.session.commit()



def undo_guitar_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.guitar_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM guitar_images"))

    db.session.commit()
