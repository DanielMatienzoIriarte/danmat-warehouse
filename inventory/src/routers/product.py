import uuid
from fastapi import APIRouter, Depends

from src.database.models.product import Product
from src.core.db_dependency import db_session


router = APIRouter(
    prefix="/api/product",
    tags=["products"],
    responses={404: {"description": "Not Found"}},
)

@router.get(
    "/{product_id}",
    response_model=Product,
    #dependencies=[Depends(validated)],
)
async def get_product(
    product_id: uuid.UUID,
    db_session: db_session,
):
    product = await get_product(db_session, product_id)
    return product