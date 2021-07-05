from typing import Optional
from fastapi import Depends, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from dotenv import load_dotenv
from helpers.database import get_db, SessionLocal, engine
from config import config

from . import crud, models, schemas


models.Base.metadata.create_all(bind=engine)

router = APIRouter()

fake_users_db = {
    "alice": {
        "id": 1,
        "username": "alice",
        "full_name": "Alice Wonderson",
        "email": "alice@example.com",
        "hashed_password": "fakehashedsecret2",
        "is_active": True,
    },
    "bob": {
        "id": 2,
        "username": "bob",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "is_active": False,
    },
}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db, email: str):
    for user_name in db:
        if email in db[user_name].values():
            user_dict = db[user_name]
            print(user_dict)
            return schemas.UserInDB(**user_dict)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, config.SECRET_KEY, algorithm=config.HASHING_ALGORITHM
    )
    return encoded_jwt


def authenticate_user(fake_db, email: str, password: str):
    user = get_user(fake_db, email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schemas.TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = get_user(fake_users_db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: schemas.User = Depends(get_current_user),
):
    if current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@router.post("/login", tags=["auth"], response_model=schemas.AuthenticatedUser)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=int(config.ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    authenticated_user = schemas.AuthenticatedUser(
        access_token=access_token, token_type="bearer", **user.dict()
    )
    return authenticated_user


@router.get("/users/me", tags=["auth"], response_model=schemas.User)
def fetch_user(user: schemas.UserBase, db: Session = Depends(get_db)):
    return get_current_active_user(user)


@router.post("/registration", tags=["auth"], response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@router.post(
    "/users/{user_id}/subscriptions/",
    tags=["subscriptions"],
    response_model=schemas.Subscription,
)
def create_subscription_for_user(
    user_id: int,
    subscription: schemas.SubscriptionCreate,
    db: Session = Depends(get_db),
):
    return crud.create_user_subscription(db=db, sub=subscription, user_id=user_id)


@router.get(
    "/users/{user_id}/subscriptions",
    tags=["subscriptions"],
    response_model=schemas.Subscription,
)
def fetch_user_subscriptions(user_id: int, db: Session = Depends(get_db)):
    return crud.get_subscriptions(
        db=db,
        user_id=user_id,
    )
