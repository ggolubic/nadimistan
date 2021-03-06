from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class Oglas(BaseModel):
    link: str
    title: str
    cijena: str
    cijena_parsed: int
    opis: str
    zupanija: str
    grad: str
    naselje: str
    m2: str
    kat: str
    broj_soba: str
    namjesten: str
    parking: str
    dostupno_od: str
    rezije: str
    mail: str
    contact: str
    active: bool
    last_active: str
    scraped: datetime


class BaseRequestModel(BaseModel):
    page: int = 0
    per_page: int = 20


class GETRequestModel(BaseRequestModel):
    grad: Optional[str]
    zupanija: Optional[str]
    cijena: Optional[int]
    m2: Optional[int]
    m2_greater: Optional[bool] = None


def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}
