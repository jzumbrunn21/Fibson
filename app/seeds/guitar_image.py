# from app.models import db, GuitarImage, User, environment, SCHEMA
# from sqlalchemy.sql import text
# from faker import Faker
# import random

# fake = Faker()

# def seed_guitars_images():
#     # guitars_num = db.session.query(Guitar).count()
#     guitars_num = db.session.query(Guitar).count()


#     for _ in range(users_num):
#         guitar_id = random.randint(1, guitars_num)

#         guitar_images = GuitarImage(
#             guitar_id = guitar_id,
#             url =
#         )

#         db.session.add(guitar_images)


#     db.session.commit()



# def undo_guitars():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.guitar_images RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM guitar_images"))

#     db.session.commit()
