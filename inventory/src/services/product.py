from src.database import IProductRepository


class ProductService:
    def __init__(self, product_repository:IProductRepository):
        self.product_repository:IProductRepository = product_repository

    async def get_product(self, product_id:uuid.UUID):
        product = await self.product_repository.get_product_by_id(product_id)
        if not product:
            raise GeneralError()
        
        return product