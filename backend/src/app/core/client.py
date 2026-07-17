from fastapi import HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine
from pydantic import ValidationError

from core.config import settings


#Crear la engine asíncrona.
engine = create_async_engine(
    settings.DATABASE_URL, 
    echo=True, 
    future=True
)

#Obtener una session de base de datos.
async def get_async_session():
    async with AsyncSession(engine) as session:
        try:
            yield session
        except ValidationError as e:
            await session.rollback()
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=e.errors())
        except Exception as e:
            await session.rollback()
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
        finally:
            await session.close()