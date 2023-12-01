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
        "https://media.sweetwater.com/api/i/q-82__h-750__f-webp__ha-547364d0a2f41f08__hmac-677a0d8b358445c678e517274771ef0a2de2a198/images/guitars/LPS5HSNH/233420047/233420047-body-large.jpg.auto.webp",
        'https://media.sweetwater.com/api/i/b-original__w-300__h-450__q-85__f-webp__ha-bc8759c1fe42b372__hmac-6b55479f184ecf648ffeec06ee6285a35b49603e/images/guitars/FlyV79KHPM/23051530817/23051530817-body-large.jpg.auto.webp',
        'https://media.sweetwater.com/api/i/b-original__w-300__h-450__q-85__f-webp__ha-e55b2cc15c55a4a5__hmac-9f4fc03db88901005a360679c17093ab23d72852/images/guitars/SGMU8CH/216030028/216030028-body-large.jpg.auto.webp',
        'https://media.sweetwater.com/api/i/b-original__w-300__h-450__q-85__f-webp__ha-010a3bfe43148f19__hmac-d67b330a354d28201181a311720d320716411cdf/images/guitars/TeleAULFHMB/US23025709/US23025709-body-large.jpg.auto.webp',
        'https://media.sweetwater.com/api/i/b-original__w-300__h-450__q-85__f-webp__ha-3f8c550096cf2a2d__hmac-b9b462a60e306fffe50c51d5f9640957f4bf014f/images/guitars/StratAV261FR/V2322390/V2322390-body-large.jpg.auto.webp',
        'https://media.sweetwater.com/api/i/b-original__w-300__h-450__q-85__f-webp__ha-c7d238b7a226fcb0__hmac-5d2b27a4944db8cc3d8a8342d2d2dfb1ad0915e9/images/guitars/StratBMarsMM/US23067314/US23067314-body-large.jpg.auto.webp',
        'https://media.sweetwater.com/api/i/b-original__w-300__h-450__q-85__f-webp__ha-9948035e35d4a014__hmac-b78b38c9d48ce4c8345f230f50cccbed24dfd1da/images/guitars/BodenNX7PrWB/C2300516/C2300516-body-large.jpg.auto.webp',
        'https://media.sweetwater.com/api/i/b-original__w-300__h-450__q-85__f-webp__ha-2cf47aaac4938aee__hmac-7e1a25054c865382f33f94224c3cf7343736dbe8/images/guitars/LPJRVTNH/217130346/217130346-body-large.jpg.auto.webp',
        'https://media.sweetwater.com/api/i/b-original__w-300__h-450__q-85__f-webp__ha-dffd24ba3f7fe8ed__hmac-689f0efc04351cbf75c3f40fbcf8bec880e16ac3/images/guitars/FrankSSRBW/EVH2203513/EVH2203513-body-large.jpg.auto.webp',
        'https://media.sweetwater.com/api/i/b-original__w-300__h-450__q-85__f-webp__ha-b79f1b89cba2ee59__hmac-12a26f5184db9430a383c3c629ebcaff88afdd63/images/guitars/StratAP2HRDK/US23076162/US23076162-body-large.jpg.auto.webp',
        'https://media.sweetwater.com/api/i/b-original__w-300__h-450__q-85__f-webp__ha-746e3eb92e8788fd__hmac-a6f27bb004fb9002279b3a1b8ab85e376f051a6d/images/guitars/LPCJJNBP/23051523141/23051523141-body-large.jpg.auto.webp',
        'https://media.sweetwater.com/api/i/b-original__w-300__h-450__q-85__f-webp__ha-1793f08b582ff018__hmac-c3336d5ca9ffce6418f1b829f1da8410dab16701/images/guitars/StratAUHSSRCB/US23024253/US23024253-body-large.jpg.auto.webp',
        'https://media.sweetwater.com/api/i/b-original__w-300__h-450__q-85__f-webp__ha-c320ff68adcaff46__hmac-0ecdbba97bc95ccb69286d7da58a2a43a2f1ae97/images/guitars/Expl58Korina/23061528626/23061528626-body-large.jpg.auto.webp',
        'https://media.sweetwater.com/api/i/b-original__w-300__h-450__q-85__f-webp__ha-9c2a5d6cb6cd85f6__hmac-c30389c208ed13a12896ee0308cd8f0978df494c/images/guitars/StratDelongeDB/MX23122663/MX23122663-body-large.jpg.auto.webp',
        'https://media.sweetwater.com/api/i/b-original__w-300__h-450__q-85__f-webp__ha-ac55015a10ce6d1a__hmac-7f4dc25ed4879b5289e7f2cf26367a16a0150251/images/guitars/LPSPSWHCS/212330100/212330100-body-large.jpg.auto.webp',
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
