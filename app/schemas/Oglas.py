from typing import Any, List, Optional
from enum import Enum
from datetime import datetime

import peewee
from pydantic import BaseModel, Field
from pydantic.utils import GetterDict


class PeeweeGetterDict(GetterDict):
    def get(self, key: Any, default: Any = None):
        res = getattr(self._obj, key, default)
        if isinstance(res, peewee.ModelSelect):
            return list(res)
        return res


class Zupanija_names(str, Enum):
    brodsko_posavska: "bjelovarsko-bilogorska"
    brodsko_posavska: "brodsko-posavska"
    dubrovacko_neretvanska: "dubrovačko-neretvanska"
    grad_zagreb: "grad zagreb"
    istarska: "istarska"
    karlovacka: "karlovačka"
    koprivnicko_krizevacka: "koprivničko-križevačka"
    krapinsko_zagorska: "krapinsko-zagorska"
    licko_senjska: "ličko-senjska"
    medimurska: "međimurska"
    osjecko_baranjska: "osječko-baranjska"
    pozesko_slavonska: "požeško-slavonska"
    primorsko_goranska: "primorsko-goranska"
    sisacko_moslavacka: "sisačko-moslavačka"
    splitsko_dalmatinska: "splitsko-dalmatinska"
    varazdinska: "varaždinska"
    viroviticko_podravska: "viroviticko_podravska"
    vukovarsko_srijemska: "vukovarsko_srijemska"
    zadarska: "zadarska"
    zagrebacka: "zagrebačka"
    sibensko_kninska: "šibensko_kninska"


class Zupanija(BaseModel):
    id: int
    ime: Zupanija_names = Field(None, alias="Zupanija")


class Grad(BaseModel):
    id: int
    ime: str
    zupanija_id: int


class Naselje(BaseModel):
    id: int
    ime: str
    grad_id: int


class OglasBase(BaseModel):
    link: str
    title: str
    cijena: str


class Oglas(OglasBase):
    id: int
    cijena_parsed: int
    opis: str
    zupanija: Zupanija
    grad: Grad
    naselje: Naselje
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
