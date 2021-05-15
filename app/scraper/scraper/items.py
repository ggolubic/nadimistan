# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class BaseOglasItem(scrapy.Item):

    cijena = scrapy.Field()
    opis = scrapy.Field()
    link = scrapy.Field()
    objavljen = scrapy.Field()
    scraped = scrapy.Field()
    zupanija = scrapy.Field()
    grad = scrapy.Field()
    kvart = scrapy.Field()
    kat = scrapy.Field()
    m2 = scrapy.Field()
    tip = scrapy.Field()
    broj_soba = scrapy.Field()
    parking = scrapy.Field()

class BaseOglasItemIndex(scrapy.Item):
    link=scrapy.Field()
    title=scrapy.Field()
    scraped=scrapy.Field()
    opis=scrapy.Field()
    objavljen=scrapy.Field()
    cijena=scrapy.Field()
    zupanija = scrapy.Field()
    grad = scrapy.Field()
    naselje = scrapy.Field()
    broj_soba = scrapy.Field()
    m2 = scrapy.Field()
    namjesten=scrapy.Field()
    kat=scrapy.Field()
    parking=scrapy.Field()
    orijentacija=scrapy.Field()
    dostupno_od=scrapy.Field()
    rezije=scrapy.Field()
    mail=scrapy.Field()
    mob=scrapy.Field()
