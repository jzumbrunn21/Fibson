from app.models import db, Guitar, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
import random

fake = Faker()

def seed_guitars():
    # guitars_num = db.session.query(Guitar).count()
    users_num = db.session.query(User).count()
    makeCat = ['Gibson','Epiphone','Fender','PRS','Taylor','Martin','Ibanez','Gretsch']
    modelCat = ['Les Paul', 'Stratocaster', 'Telecaster', 'SG', 'Custom', 'ES-335' ,'110-Dreadnaught', 'Standard']

    for _ in range(users_num):
        merchant_id = random.randint(1, users_num)

        guitar = Guitar(
            merchant_id = merchant_id,
            make = random.choice(makeCat),
            model = random.choice(modelCat),
            year = random.randint(1901, 2024),
            guitar_type = random.choice(['Electric', 'Acoustic', 'Bass', 'Other']),
            body_type = random.choice(['Solid-Body', 'Semi-Hollow', 'Hollow' ]),
            wood_type = random.choice(['Alder', 'Ash', 'Mahogany', 'Maple', 'Rosewood', 'Walnut', 'Exotic']),
            color = random.choice(['Velvet Red', 'Silk White', 'Dark Green', 'Sunburst Orange','Goldtop', 'Sky Blue', 'Black']),
            pickup_type = random.choice(['Single-Coil', 'Humbucker', 'Both', 'None']),
            joint_type = random.choice(['Glued-Neck', 'Bolt-on-Neck']),
            fretboard_material = random.choice(['Ebony', 'Mahogany', 'Maple', 'Rosewood', 'Exotic']),
            frets = random.randint(18, 26),
            inlays = random.choice(['Pearl-Dot', 'Trapezoid', 'Other', 'None']),
            handedness = random.choice(['Right', 'Left']),
            description = fake.paragraph(nb_sentences=4),
            pickguard = random.choice([True, False]),
            pickup_selector = random.choice(['2-Switch', '3-Switch', '5-Switch', 'None'])
        )

        db.session.add(guitar)


    db.session.commit()



def undo_guitars():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.guitars RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM guitars"))

    db.session.commit()
