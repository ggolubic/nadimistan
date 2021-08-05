from sqlalchemy.orm import Session
from passlib.context import CryptContext

from . import models, schemas


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
        email=user.email,
        full_name=user.full_name,
        hashed_password=hashed_password,
        is_active=False,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def activate_user(db: Session, user: schemas.User):
    db_user = get_user_by_email(db, user.email)
    db_user.is_active = True
    db.commit()
    return db_user
