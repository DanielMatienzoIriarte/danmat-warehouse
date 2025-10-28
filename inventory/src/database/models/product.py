import uuid
from decimal import Decimal
from sqlalchemy.orm import Mapped, mapped_column
from src.database.models.base import Base


class Product(Base):
    __tablename__ = "products"

    product_id: Mapped[uuid.UUID] = mapped_column(default_factory=uuid.uuid4, primary_key=True, index=True, nullable=False)
    sku: Mapped[str]
    name: Mapped[str]
    description: Mapped[str]
    image: str = mapped_column(default="default_product.jpg", nullable=False)
    price: Decimal = mapped_column(default=Decimal(0.00), max_digits=9, decimal_places=2, nullable=False)
    quantity: int = mapped_column(default=1, nullable=False)