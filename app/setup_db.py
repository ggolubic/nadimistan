import os
from dotenv import load_dotenv
from peewee import PostgresqlDatabase
from models.Oglas import Zupanija, Grad, Naselje, Oglas

load_dotenv()
env = os.environ

db = PostgresqlDatabase(
    "nadimistan",
    user=env.get("DB_USER"),
    password=env.get("DB_USER_PWD"),
    host=env.get("DB_HOST"),
)
db.create_tables([Zupanija, Grad, Naselje, Oglas])
