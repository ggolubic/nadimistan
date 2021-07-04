from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.post("/users/{user_id}/subscriptions/", response_model=schemas.Subscription)
def create_subscription_for_user(
    user_id: int,
    subscription: schemas.SubscriptionCreate,
    db: Session = Depends(get_db),
):
    return crud.create_user_subscription(db=db, sub=subscription, user_id=user_id)


@app.get("/users/{user_id}/subscriptions", response_model=schemas.Subscription)
def fetch_user_subscriptions(user_id: int, db: Session = Depends(get_db)):
    return crud.get_subscriptions(
        db=db,
        user_id=user_id,
    )
