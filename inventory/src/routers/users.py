from fastapi import APIRouter

router = APIRouter(prefix="/user", tags=["users"])

@router.post("/", response_model=UserCreate)
def index():
    return {"hello": "world"}