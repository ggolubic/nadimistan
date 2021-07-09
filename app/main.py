from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pandas import DataFrame
import json

from tasks.task_app import scheduler
from models.Oglas import Zupanija, Oglas, Naselje, Grad
from routers.auth import auth
from routers.subscriptions import subscriptions
from routers.oglasi import oglasi
from routers.oglasi.crud import add_oglas, fetch_oglasi
from helpers.update_mongo import update_many


app = FastAPI()
app.include_router(auth.router)
app.include_router(subscriptions.router)
app.include_router(oglasi.router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
    allow_origins=["*"],
)

scheduler.start()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/test_data")
async def dump_data():
    query = (
        Oglas.select(Oglas, Zupanija, Naselje, Grad)
        .join(Zupanija)
        .switch(Oglas)
        .join(Grad)
        .switch(Oglas)
        .join(Naselje)
    )
    data = [i.serialize for i in query]
    df = DataFrame.from_dict(data)
    df.to_excel("dump.xlsx", "sheet1")
    return data[0]
