from app.models import db, Review, User, Guitar, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
import random

fake = Faker()

def seed_reviews():
    users_num = db.session.query(User).count()
    guitars_num = db.session.query(Guitar).count()

    for _ in range(users_num):
        review = Review(
            userId = random.randint(1, users_num),
            guitarId = random.randint(1, guitars_num),
            description = fake.paragraph(nb_sentences=4),
            stars = random.randint(1, 5)
        )

        db.session.add(review)

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
