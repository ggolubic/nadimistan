from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder

from routers.auth.auth import get_current_user
from routers.auth.schemas import AuthenticatedUser

from . import crud, schemas

router = APIRouter(tags=["oglasi"], prefix="/oglasi")


@router.get(
    "/",
)
async def fetch_oglasi(
    model: schemas.GETRequestModel = Depends(),
    user: AuthenticatedUser = Depends(get_current_user),
):
    oglasi = await crud.fetch_oglasi(**model.__dict__)
    return oglasi
