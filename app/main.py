import json

from fastapi import FastAPI, Response
from models.Oglas import Zupanija, Oglas, Naselje, Grad
from playhouse.shortcuts import model_to_dict
from pandas import DataFrame


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/test_data")
async def get_test_csv():
    query = (
        Oglas.select(Oglas, Zupanija, Naselje, Grad)
        .join(Zupanija)
        .join(Grad)
        .join(Naselje)
        .limit(100)
    )
    data = [i.serialize for i in query]
    df = DataFrame.from_dict(data)
    df.to_excel("sample.xlsx", "sheet1")
    if data:
        return data
        # return Response(data, 200)
        # return {"status_code": 200}
