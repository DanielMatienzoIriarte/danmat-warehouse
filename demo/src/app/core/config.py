import secrets
import warnings
from typing import Any, Literal, Annotated

from pydantic import (
    AnyUrl,
    BeforeValidator,
    HttpStr,
    EmailStr,
)
from pydantic_settings import BaseSettings, SettingConfigDict

def parse_cors(value: Any) -> list[str] | str:
    if isinstance(value, str) and not value.startswith('['):
        return [i.strip() for i in value.split(',') if i.strip()]
    elif isinstance(value, list | str):
        return value
    raise ValueError(value)


class Settings(BaseSettings):
    model_config = SettingConfigDict(
        env_file = '../.env'
    )

    SECRET_KEY: str = secrets.token_urlsafe(32)
    TOKEN_TTL: int = 60*24*8
    FRONTEND_HOST: str = 'http://localhost:5173'
    ENVIRONMENT: Literal['development', 'staing', 'production'] = 'development'
    BACKEND_CORS_ORIGINS = Annotated[
        list[AnyUrl] | str, BeforeValidator(parse_cors)
    ] = []