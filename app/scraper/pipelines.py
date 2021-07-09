# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
import logging
import datetime
from peewee import DoesNotExist
from models.Oglas import Oglas, Naselje, Grad, Zupanija

from routers.oglasi import crud


class PersistData(object):
    def persist_oglas(self, item):

        oglas = crud.update_or_create_oglas(item.get("link"), item)
        logging.info(f"Exists in database - set as active : {oglas.link}")

    def process_item(self, item, spider):

        self.persist_oglas(item)

        return item
