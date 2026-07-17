from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from routers import users, categories, products

# ================= APP FASTAPI =================
app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.PROJECT_VERSION,
)

# Routers
#app.include_router(users.router)
app.include_router(categories.router)
#app.include_router(products.router)

# Middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# EndPoints
@app.get("/", status_code=status.HTTP_200_OK)
async def root() -> dict:
    return {
        "título": app.title,
        "descripción": app.description,
        "versión": app.version,
    }
    



