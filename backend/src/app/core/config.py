from os import getenv
from dotenv import load_dotenv
from pydantic import BaseModel

#Cargar Variables de Entorno.
load_dotenv()

#Seguridad.
CRYPTOGRAPHY = getenv("CRYPTOGRAPHY")
ALGORITHM = getenv("ALGORITHM")
SECRET = getenv("SECRET")
ACCESS_TOKEN_DURATION = getenv("ACCESS_TOKEN_DURATION")

#URL de conexión a la Base de Datos.
DATABASE_URL = getenv("DATABASE_URL")

#Clase de Configuración.
class Setting(BaseModel):
    PROJECT_NAME: str = "Catálogo Virtual"
    PROJECT_DESCRIPTION: str = "Esta es una web diseñada como catálogo virtual para un negocio de ventas de Sex Toys"
    PROJECT_VERSION: str = "1.0.0"
    DATABASE_URL: str = DATABASE_URL
    CRYPTOGRAPHY: str = CRYPTOGRAPHY
    ALGORITHM: str = ALGORITHM
    SECRET: str = SECRET
    ACCESS_TOKEN_DURATION: int = int(ACCESS_TOKEN_DURATION)

settings: Setting = Setting()