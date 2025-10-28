from fastapi import Depends
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import uuid

from src.database import IProductRepository
from src.database.models.product import Product


class ProductRepository(IProductRepository):
    def __init__(self, db_session: AsyncSession = Depends()):
        self.db_session = db_session

    async def get_product_by_id(self, product_id:uuid.UUID) -> Product:
        query = select(Product).where(Product.id == product_id)
        return await self.db_session.execute(query)
    
    async def get_all_products(self) -> List[Product]:
        query = "SELECT * FROM products"
        return await self.db_session.fetch()