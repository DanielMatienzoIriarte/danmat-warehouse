from abc import abstractmethod
from typing import List
import uuid

from src.database.models.product import Product


class IProductRepository():
    @abstractmethod
    async def get_product_by_id(self, id: uuid.UUID) -> Product:
        pass

    @abstractmethod
    async def get_all_products(self) -> List[Product]:
        pass