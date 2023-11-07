from app.models import db, User, environment, SCHEMA, ShoppingCart
from sqlalchemy.sql import text
from faker import Faker

fake = Faker()
# Adds a demo user, you can add other users here if you want
def seed_users():

    for _ in range(20):
        user = User(
            username = fake.user_name(),
            email = fake.email(),
            password = 'password',
            first_name = fake.first_name(),
            last_name = fake.last_name(),
        )

        db.session.add(user)
        db.session.commit()

        cart = ShoppingCart(user_id=user.id)

        db.session.add(cart)
        db.session.commit()

    demo = User(
        username = 'Rockstar123',
        email = "demo@aa.io",
        password = 'password',
        first_name = 'Demo',
        last_name = 'User'
    )
    db.session.add(demo)
    db.session.commit()

    demo_cart = ShoppingCart(user_id=demo.id)
    db.session.add(demo_cart)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
