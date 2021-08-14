from fastapi import APIRouter, Depends, status, HTTPException
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
    oglasi = await crud.fetch_oglasi(**model.dict())
    return oglasi


@router.get(
    "/{slug}",
)
async def get_oglas_data(slug):
    oglas = await crud.retrieve_oglas(slug)
    if oglas:
        return oglas
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Doesn't exist",
    )
