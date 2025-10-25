from fastapi import FastAPI
from pydantic import BaseModel

class Post(BaseModel):
    email: str
    password: str
    is_active:bool