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
    ulica = scrapy.Field()
    kat = scrapy.Field()
    m2 = scrapy.Field()
    tip = scrapy.Field()
    broj_soba = scrapy.Field()
    parking = scrapy.Field()
