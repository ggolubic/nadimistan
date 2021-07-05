from sqlalchemy.orm import Session
from passlib.context import CryptContext

from . import models, schemas
from helpers.email import send_registration_email


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        email=user.email, full_name=user.full_name, hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    send_registration_email(db_user)
    return db_user


def get_subscriptions(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Subscription)
        .filter(models.Subscription.owner_id == user_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_user_subscription(
    db: Session, sub: schemas.SubscriptionCreate, user_id: int
):
    db_sub = models.Subscription(**sub.dict(), owner_id=user_id)
    db.add(db_sub)
    db.commit()
    db.refresh(db_sub)
    return db_sub
