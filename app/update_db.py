from models.Oglas import Oglas
from re import sub
import datetime

from models.Oglas import database


def update_cijena_parsed():
    oglasi = Oglas.select().execute()

    for oglas in oglasi:
        parsed_cijena = (
            oglas.cijena[2 : len(oglas.cijena) - 3].replace(".", "").replace(",", "")
        )
        oglas.cijena_parsed = parsed_cijena

    with database.atomic():
        Oglas.bulk_update(oglasi, fields=["cijena_parsed"], batch_size=50)


def update_scraped():
    oglasi = Oglas.select().execute()

    for oglas in oglasi:
        oglas.scraped = datetime.date.today()

    with database.atomic():
        Oglas.bulk_update(oglasi, fields=["scraped"], batch_size=50)
