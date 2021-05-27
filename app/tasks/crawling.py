# from ...scraper.scraper.start_spider import start_spider
from time import sleep
import datetime
import operator

from models.Oglas import Oglas, Zupanija, Naselje, Grad
from .task_app import scheduler


def find_eligible_entries(**args):
    expression = None
    for (k, v) in args.items():
        if k is None:
            continue
        if expression is None:
            if k == "cijena":
                expression = Oglas.cijena_parsed < int(v)
            elif k == "grad":
                expression = Grad.ime.contains(v.lower())
            elif k == "naselje":
                expression = Naselje.ime.contains(v.lower())
            elif k == "zupanija":
                expression = Zupanija.ime.contains(v.lower())
            else:
                expression = getattr(Oglas, k).contains(v.lower())

        else:
            if k == "cijena":
                expression &= Oglas.cijena_parsed < int(v)
            elif k == "grad":
                expression &= Grad.ime.contains(v.lower())
            elif k == "naselje":
                expression &= Naselje.ime.contains(v.lower())
            elif k == "zupanija":
                expression &= Zupanija.ime.contains(v.lower())
            else:
                expression &= getattr(Oglas, k).contains(v.lower())

    query = (
        Oglas.select(
            Oglas.link,
            Oglas.cijena,
            Oglas.opis,
            Oglas.m2,
            Oglas.kat,
            Oglas.broj_soba,
            Oglas.dostupno_od,
        )
        .join(Zupanija)
        .switch(Oglas)
        .join(Grad)
        .switch(Oglas)
        .join(Naselje)
        .where(expression)
        .where(
            Oglas.scraped.between(
                datetime.date.today(),
                datetime.date.today() + datetime.timedelta(days=1),
            )
        )
        # .execute()
    )


# @scheduler.scheduled_job(
#     # trigger="cron",
#     # hour=17,
#     # minute=0,
#     trigger="interval",
#     minutes=10,
#     id="daily_crawl",
#     coalesce=True,
#     misfire_grace_time=None,
# )
# def init_crawling():
#     find_eligible_entries(cijena=3000, grad="Split")
# print("im running a job")
# start_spider("index")


# init_crawling()
