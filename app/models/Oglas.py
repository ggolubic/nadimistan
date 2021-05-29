from peewee import (
    SqliteDatabase,
    Model,
    CharField,
    ForeignKeyField,
    TextField,
    DateTimeField,
    IntegerField,
    BooleanField,
    PostgresqlDatabase,
)
import os

env = os.environ

database = PostgresqlDatabase(
    "nadimistan",
    user=env.get("DB_USER"),
    password=env.get("DB_USER_PWD"),
    host="localhost",
    port=5432,
)


class BaseModel(Model):
    class Meta:
        database = database


class Zupanija(BaseModel):
    ime = CharField()

    class Meta:
        pass


class Grad(BaseModel):
    ime = CharField()
    zupanija = ForeignKeyField(Zupanija)

    class Meta:
        pass


class Naselje(BaseModel):
    ime = CharField()
    grad = ForeignKeyField(Grad)

    class Meta:
        pass


class Oglas(BaseModel):
    link = TextField(unique=True)
    title = CharField()
    cijena = CharField()
    cijena_parsed = IntegerField()
    opis = TextField()
    zupanija = ForeignKeyField(Zupanija)
    grad = ForeignKeyField(Grad)
    naselje = ForeignKeyField(Naselje)
    m2 = CharField()
    kat = CharField()
    broj_soba = CharField()
    namjesten = CharField()
    parking = CharField()
    dostupno_od = CharField()
    rezije = CharField()
    mail = CharField()
    contact = CharField()
    active = BooleanField(default=True)
    last_active = TextField()
    scraped = DateTimeField()

    class Meta:
        pass

    @property
    def serialize(self):
        data = {
            "link": self.link,
            "title": self.title,
            "cijena": self.cijena,
            "opis": self.opis,
            "zupanija": self.zupanija.ime,
            "grad": self.grad.ime,
            "naselje": self.naselje.ime,
            "m2": self.m2,
            "kat": self.kat,
            "broj_soba": self.broj_soba,
            "namjesten": self.namjesten,
            "parking": self.parking,
            "dostupno_od": self.dostupno_od,
            "rezije": self.rezije,
            "mail": self.mail,
            "contact": self.contact,
            "active": self.active,
            "last_active": self.last_active,
        }

        return data
