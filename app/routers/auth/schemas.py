from typing import List, Optional
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

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str
    full_name: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    subscriptions: List[Subscription] = []

    class Config:
        orm_mode = True


class UserInDB(User):
    hashed_password: str


class AuthenticatedUser(User):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
