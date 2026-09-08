from fastapi import HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine
from pydantic import ValidationError
from core.config import settings
import logging

# Configuración de logging (solo errores críticos en producción)
logger = logging.getLogger(__name__)

# 🔥 Engine optimizado para producción
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,               # Desactivar logs SQL (mejora rendimiento)
    future=True,
    pool_size=10,             # Conexiones activas en el pool
    max_overflow=20,          # Conexiones extra permitidas bajo demanda
    pool_timeout=10,          # Tiempo máximo para obtener conexión (segundos)
    pool_recycle=1800,        # Reciclar conexiones cada 30 minutos (evita timeouts)
    pool_pre_ping=True,       # Verificar conexión antes de usarla (crítico para Supabase)
    connect_args={
        "timeout": 10,        # Timeout de conexión
        "command_timeout": 30 # Timeout de comandos SQL
    }
)

async def get_async_session():
    async with AsyncSession(engine) as session:
        try:
            yield session
        except Exception as e:
            await session.rollback()
            error_msg = str(e).lower()
            
            # Log del error (solo en producción para diagnóstico)
            logger.error(f"Error en sesión de BD: {e}")
            
            # Clasificación de errores para respuestas HTTP adecuadas
            if "connection" in error_msg or "timeout" in error_msg:
                raise HTTPException(
                    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                    detail="Base de datos no disponible temporalmente. Reintente."
                )
            elif "validation" in error_msg:
                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail="Error de validación de datos."
                )
            else:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Error interno del servidor."
                )
        finally:
            await session.close()