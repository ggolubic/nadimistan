from pydantic import BaseModel, Extra, validator
from fastapi import HTTPException, status
from typing_extensions import TypedDict
from datetime import datetime


class SubscriptionConfig(TypedDict, total=False):
    grad: str
    zupanija: str
    cijena: int
    m2: int
    m2_greater: bool = False


class SubscriptionBase(BaseModel):
    config: SubscriptionConfig
    interval: int

    @validator("interval")
    def correct_interval(cls, v):
        if v not in [43200, 86400]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Interval must be a day or half a day",
            )
        return v


class SubscriptionCreate(SubscriptionBase):
    pass


class Subscription(SubscriptionBase):
    id: int
    user_id: int
    disabled: bool
    last_active: datetime

    class Config:
        orm_mode = True
        extra = Extra.forbid
