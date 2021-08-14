import pymongo
from itemadapter import ItemAdapter
import logging
from datetime import datetime

from routers.oglasi import crud
from config import config


class PersistData(object):

    collection_name = "oglasi_collection"

    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db

    @classmethod
    def from_crawler(cls, crawler):
        return cls(mongo_uri=config.MONGO_URI, mongo_db="oglasi")

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

    def close_spider(self, spider):
        self.client.close()

    def persist_item(self, item):
        adapter = ItemAdapter(item)

        oglas = self.db[self.collection_name].find_one({"link": adapter["link"]})
        if oglas:
            updated_oglas = self.db[self.collection_name].update_one(
                {
                    "link": adapter["link"],
                },
                {"$set": {"active": True, "last_active": datetime.now()}},
            )
            if updated_oglas:
                logging.info(
                    f"Exists in database - updated last active : {adapter['link']}"
                )
                return item

        self.db[self.collection_name].insert_one(adapter.asdict())
        logging.info(f"Sucessfully added : {adapter['link']}")
        return item

    def process_item(self, item, spider):
        self.persist_item(item)
        return item
