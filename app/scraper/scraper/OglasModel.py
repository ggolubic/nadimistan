from peewee import (
    SqliteDatabase,
    Model,
    CharField,
    ForeignKeyField,
    TextField,
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
    host=env.get("DB_HOST"),
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

    class Meta:
        pass
