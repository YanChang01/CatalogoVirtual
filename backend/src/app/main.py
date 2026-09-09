from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import cloudinary

from .core.config import settings
from .routers import users, categories, products
from .services import cloudinary as my_cloudinary_module

# ================= APP FASTAPI =================
app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.PROJECT_VERSION,
)

# Routers
app.include_router(users.router)
app.include_router(categories.router)
app.include_router(products.router)
app.include_router(my_cloudinary_module.router)

# Middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cloudinary
cloudinary.config(
    cloud_name = settings.CLOUDINARY_CLOUD_NAME,
    api_key = settings.CLOUDINARY_API_KEY,
    api_secret = settings.CLOUDINARY_API_SECRET
)
