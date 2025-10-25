from pydantic import BaseModel, Field
import uuid

class Item(BaseModel):
    id: uuid.UUID = Field(default_factory=uuid.uuid4)
    name: str
    description: str
    image: str
    price: str