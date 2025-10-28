import asyncpg
from fastapi import FastAPI, Request
from contextlib import asynccontextmanager

from rotoger import Rotoger
from src.core.inventory_redis import get_redis
from src.core.config import settings as global_settings

#logger = Rotoger().get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.redis = await get_redis()
    postgres_dsn = global_settings.postgres_url

    try:
        app.postgres_pool = await asyncpg.create_pool(
            dsn=str(postgres_dsn),
            min_size=5,
            max_size=20,
        )

        """
        await logger.ainfo(
            "Postgresql pool created",
            idle_size=app.postgres_pool.get_idle_size()
        ) """
        yield
    except Exception as exception:
        #await logger.aerror("Error during app startup", error=repr(exception))
        raise
    finally:
        await app.redis.close()
        await app.postgres_pool.close()


def create_app() -> FastAPI:
    app = FastAPI(
        title="Danmat Inventory",
        version="0.0.1",
        lifespan=lifespan,
    )

    @app.get("/index")
    def get_index(request: Request):
        return {"hola": "mundo"}

    return app


app = create_app()