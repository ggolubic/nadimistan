from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.encoders import jsonable_encoder

from routers.auth.auth import get_current_user
from routers.auth.schemas import AuthenticatedUser

from . import crud, schemas

router = APIRouter(tags=["notifications"], prefix="/notifications")


@router.get(
    "/",
)
async def fetch_notifications(
    user: AuthenticatedUser = Depends(get_current_user),
):
    notifications = await crud.fetch_notifications(user.id)
    return notifications


@router.post(
    "/{id}",
)
async def read_notification(id):
    notification = await crud.update_read(id)
    if notification:
        return notification
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Doesn't exist",
    )
