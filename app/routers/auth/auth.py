from typing import Optional
from fastapi import Depends, APIRouter, HTTPException, status, Body
from fastapi.security import (
    OAuth2PasswordBearer,
    OAuth2PasswordRequestForm,
)
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import datetime, timedelta

from helpers.database import get_db, engine
from helpers.email import send_registration_email, send_reset_password_email
from config import config
from . import crud, models, schemas


models.Base.metadata.create_all(bind=engine)

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"Authentication": "Bearer"},
)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=60 * 24)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, config.SECRET_KEY, algorithm=config.HASHING_ALGORITHM
    )
    return encoded_jwt


def authenticate_user(db, email: str, password: str):
    user = crud.get_user_by_email(db, email)
    if not user:
        return None
    if not user.is_active:
        return None
    if not crud.verify_password(password, user.hashed_password):
        return None
    return user


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):

    try:
        payload = jwt.decode(
            token, config.SECRET_KEY, algorithms=[config.HASHING_ALGORITHM]
        )
        email: str = payload.get("sub")

        if email is None:
            raise credentials_exception

        token_data = schemas.TokenData(email=email)
    except JWTError:
        raise credentials_exception

    user = crud.get_user_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user


@router.post("/login", tags=["auth"], response_model=schemas.AuthenticatedUser)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise credentials_exception

    access_token_expires = timedelta(minutes=int(config.ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    # hacky  - look for better solution
    authenticated_user = schemas.AuthenticatedUser(
        access_token=access_token, token_type="bearer", **user.__dict__
    )
    return authenticated_user


@router.get("/session", tags=["auth"], response_model=schemas.UserInDB)
async def get_current_active_user(
    current_user: schemas.User = Depends(get_current_user),
):
    if current_user.is_active is not True:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@router.post(
    "/registration",
    tags=["auth"],
    response_model=schemas.User,
    status_code=status.HTTP_201_CREATED,
)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = crud.get_user_by_email(db, email=user.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Email already registered"
        )

    created_user = crud.create_user(db=db, user=user)

    token_data = {
        "email": str(created_user.email),
        "exp": datetime.utcnow() + timedelta(minutes=60),
    }
    encoded_jwt = jwt.encode(
        token_data, config.SECRET_KEY, algorithm=config.HASHING_ALGORITHM
    )

    send_registration_email(
        created_user,
        encoded_jwt,
    )


@router.post("/activate", tags=["auth"], status_code=status.HTTP_200_OK)
def activate(token: str, db: Session = Depends(get_db)):
    try:
        data = jwt.decode(
            token, config.SECRET_KEY, algorithms=[config.HASHING_ALGORITHM]
        )

        user_email = data.get("email")
        if user_email is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        user = crud.get_user_by_email(db, email=user_email)
        if user is None or user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        crud.activate_user(db, user)
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
        )


@router.post("/reset-password", tags=["auth"], status_code=status.HTTP_201_CREATED)
def request_reset_password(email: str, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=email)
    if not user:
        raise credentials_exception

    token_data = {
        "email": str(user.email),
        "exp": datetime.utcnow() + timedelta(minutes=60),
    }
    encoded_jwt = jwt.encode(
        token_data, config.SECRET_KEY, algorithm=config.HASHING_ALGORITHM
    )

    send_reset_password_email(
        user,
        encoded_jwt,
    )


@router.put("/reset-password", tags=["auth"], status_code=status.HTTP_200_OK)
def reset_password(
    token: str, password: str = Body(..., embed=True), db: Session = Depends(get_db)
):
    try:
        data = jwt.decode(
            token, config.SECRET_KEY, algorithms=[config.HASHING_ALGORITHM]
        )

        user_email = data.get("email")
        if user_email is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        user = crud.get_user_by_email(db, email=user_email)
        if user is None or user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        crud.update_password(db, user, password)
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
        )
