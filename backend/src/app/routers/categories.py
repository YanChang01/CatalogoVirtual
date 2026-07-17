from fastapi import APIRouter, status, HTTPException, Depends
from typing import List, Optional
from sqlmodel.ext.asyncio.session import AsyncSession

from models.models import Category
from schemas.schemas import CategoryCreate, CategoryResponse, CategoryUpdate, CategoryWithProducts
from crud.categories import create_category, read_category, read_categories, update_category, delete_category
from core.client import get_async_session

#Router
router = APIRouter(prefix="/categories")

#EndPoints
@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=CategoryResponse)
async def create(category: CategoryCreate, session: AsyncSession = Depends(get_async_session)) -> CategoryResponse:
    
    return await create_category(category=category, session=session)






