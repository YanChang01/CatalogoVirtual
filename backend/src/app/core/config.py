from os import getenv
from dotenv import load_dotenv
from pydantic import BaseModel

#Cargar Variables de Entorno.
load_dotenv()

#URL de conexión al Frontend.
FRONTEND_URL = getenv("FRONTEND_URL")

#URL de conexión al Backend.
BACKEND_URL = getenv("BACKEND_URL")

#URL de conexión a la Base de Datos en la nube.
DATABASE_URL = getenv("DATABASE_URL")

#URL de conexión a la Base de Datos local.
DATABASE_URL_LOCAL = getenv("DATABASE_URL_LOCAL")

#URL de conexión a Cloudinary.
CLOUDINARY_URL = getenv("CLOUDINARY_URL")

#Seguridad.
ALGORITHM = getenv("ALGORITHM")
SECRET = getenv("SECRET")
ACCESS_TOKEN_DURATION = getenv("ACCESS_TOKEN_DURATION")
CLOUDINARY_CLOUD_NAME = getenv("CLOUDINARY_CLOUD_NAME")
CLOUDINARY_API_KEY = getenv("CLOUDINARY_API_KEY")
CLOUDINARY_API_SECRET = getenv("CLOUDINARY_API_SECRET")
CLOUDINARY_UPLOAD_PRESET =  getenv("CLOUDINARY_UPLOAD_PRESET")
CLOUDINARY_ASSET_FOLDER = getenv("CLOUDINARY_ASSET_FOLDER")

#Clase de Configuración.
class Setting(BaseModel):
    PROJECT_NAME: str = "Catálogo Virtual"
    PROJECT_DESCRIPTION: str = "Esta es una web diseñada como catálogo virtual para un negocio de ventas de Sex Toys"
    PROJECT_VERSION: str = "1.0.0"
    PROJECT_AUTHOR_1: str = "Yan Hernández Chang"
    PROJECT_AUTHOR_2: str = "Adrián Sabadí Rodríguez"
    FRONTEND_URL: str = FRONTEND_URL
    BACKEND_URL: str = BACKEND_URL
    DATABASE_URL: str = DATABASE_URL
    DATABASE_URL_LOCAL: str = DATABASE_URL_LOCAL
    ALGORITHM: str = ALGORITHM
    SECRET: str = SECRET
    ACCESS_TOKEN_DURATION: int = int(ACCESS_TOKEN_DURATION)
    CLOUDINARY_URL: str = CLOUDINARY_URL
    CLOUDINARY_CLOUD_NAME: str = CLOUDINARY_CLOUD_NAME
    CLOUDINARY_API_KEY: str = CLOUDINARY_API_KEY
    CLOUDINARY_API_SECRET: str = CLOUDINARY_API_SECRET
    CLOUDINARY_UPLOAD_PRESET: str = CLOUDINARY_UPLOAD_PRESET
    CLOUDINARY_ASSET_FOLDER: str = CLOUDINARY_ASSET_FOLDER

settings: Setting = Setting()