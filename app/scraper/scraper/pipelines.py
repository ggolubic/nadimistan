# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
import logging
import datetime
from peewee import DoesNotExist
from ...models.Oglas import Oglas, Naselje, Grad, Zupanija


class PersistData(object):
    def persist_oglas(self, item):

        new_zupanija, _ = Zupanija.get_or_create(ime=item.get("zupanija"))
        new_grad, _ = Grad.get_or_create(
            ime=item.get("grad"), zupanija_id=new_zupanija.id
        )
        new_naselje, _ = Naselje.get_or_create(
            ime=item.get("naselje"), grad_id=new_grad.id
        )

        try:
            ogl = Oglas.get(Oglas.link == item.get("link"))
            q = Oglas.update(active=True, last_active=datetime.datetime.now()).where(
                Oglas.link == item.get("link")
            )
            q.execute()
            logging.info(f"Exists in database - set as active : {ogl.link}")

        except DoesNotExist:
            ogl = Oglas.create(
                link=item.get("link"),
                title=item.get("title"),
                cijena=item.get("cijena"),
                zupanija=new_zupanija.id,
                grad=new_grad.id,
                naselje=new_naselje.id,
                objavljen=item.get("objavljen"),
                opis=item.get("opis"),
                m2=item.get("m2"),
                broj_soba=item.get("broj_soba"),
                namjesten=item.get("namjesten"),
                kat=item.get("kat"),
                parking=item.get("parking"),
                orijentacija=item.get("orijentacija"),
                rezije=item.get("rezije"),
                dostupno_od=item.get("dostupno_od"),
                mail=item.get("mail"),
                contact=item.get("contact"),
                scraped=item.get("scraped"),
                last_active=item.get("scraped"),
            )

    def process_item(self, item, spider):

        self.persist_oglas(item)

        return item
