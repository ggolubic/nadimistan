from sqlalchemy.orm import Session

from . import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
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
