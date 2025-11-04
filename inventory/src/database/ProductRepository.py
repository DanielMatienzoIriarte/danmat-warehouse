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

    async def get_by_id(self, product_id:uuid.UUID) -> Product:
        #return self.db_session.query(Product).filter(Product.id == product_id).first()
        query = select(Product).where(Product.id == product_id)
        return await self.db_session.execute(query)
    
    async def get_all(self) -> List[Product]:
        return await self.db_session.query(Product).all()
    
    async def add(self, product: Product) -> None:
        self.db_session.add(product)
        self.db_session.commit()