from scraper.start_spider import start_spider
from time import sleep
import datetime
import crochet

from helpers.email import send_listings_email
from models.Oglas import Oglas, Zupanija, Naselje, Grad
from .task_app import scraping_scheduler


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
            elif isinstance(v, int):
                expression = getattr(Oglas, k) <= v
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
            elif isinstance(v, int):
                expression &= getattr(Oglas, k) <= v
            else:
                expression &= getattr(Oglas, k).contains(v.lower())

    query = (
        Oglas.select(
            Oglas.link,
            Oglas.title,
            Oglas.cijena,
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
    return query


@crochet.run_in_reactor
@scraping_scheduler.scheduled_job(
    trigger="interval",
    minutes=60,
    id="short_index_crawl",
    misfire_grace_time=None,
)
def init_short_index_crawling():
    start_spider("index", pagination=5)
