from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from pydantic import ValidationError
import json

from helpers.database import get_db
from . import schemas, crud
from routers.auth.auth import get_current_user
from routers.auth.schemas import AuthenticatedUser

router = APIRouter()


@router.post(
    "/users/{user_id}/subscriptions",
    tags=["subscriptions"],
    response_model=schemas.Subscription,
)
def create_subscription_for_user(
    user_id: int,
    subscription: schemas.SubscriptionCreate,
    db: Session = Depends(get_db),
    user: AuthenticatedUser = Depends(get_current_user),
):
    subscriptions = crud.get_subscriptions(db, user_id)
    if subscriptions:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Subscription already exists",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return crud.create_user_subscription(db=db, sub=subscription, user_id=user_id)


# Look into how to return empty response while keeping response_model
@router.get(
    "/users/{user_id}/subscriptions",
    tags=["subscriptions"],
    # response_model=schemas.Subscription,
)
def fetch_user_subscriptions(
    user_id: int,
    user: AuthenticatedUser = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    subs = crud.get_subscriptions(
        db=db,
        user_id=user_id,
    )
    if not subs:
        return Response(content=json.dumps([]), status_code=status.HTTP_200_OK)
    return subs


@router.put("/users/{user_id}/subscriptions/{sub_id}", tags=["subscriptions"])
def update_user_subscription(
    user_id: int,
    sub_id: int,
    subscription: schemas.SubscriptionCreate,
    user: AuthenticatedUser = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    sub = crud.get_subscriptions(db=db, user_id=user_id)
    if not sub:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Subscription is already disabled or doesn't exist",
        )
    updated_sub = crud.update_user_subscription(
        db=db,
        sub=subscription,
        sub_id=sub_id,
        user_id=user_id,
    )
    return Response(content=json.dumps(updated_sub), status_code=status.HTTP_200_OK)


@router.put("/users/{user_id}/subscriptions/{sub_id}/disable", tags=["subscriptions"])
def unsubscribe(
    user_id: int,
    sub_id: int,
    user: AuthenticatedUser = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    sub = crud.get_subscriptions(db=db, user_id=user_id)
    if not sub:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Subscription is already disabled or doesn't exist",
        )
    crud.remove_user_subscription(db=db, sub_id=sub_id, user_id=user_id)
    return Response("Subscription successfully removed", status_code=status.HTTP_200_OK)
