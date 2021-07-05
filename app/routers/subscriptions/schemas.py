from pydantic import BaseModel
from datetime import datetime


class SubscriptionBase(BaseModel):
    config: dict
    interval: int


class SubscriptionCreate(SubscriptionBase):
    pass


class Subscription(SubscriptionBase):
    id: int
    user_id: int
    disabled: bool
    last_active: datetime
    user_id: int

    class Config:
        orm_mode = True
