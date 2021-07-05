from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pandas import DataFrame
import json

from tasks.task_app import scheduler
from models.Oglas import Zupanija, Oglas, Naselje, Grad
from routers.auth import main


app = FastAPI()
app.include_router(main.router)

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
