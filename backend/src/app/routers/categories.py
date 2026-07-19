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

@router.get("/read/{name}", status_code=status.HTTP_200_OK, response_model=CategoryResponse)
async def read(name: str, session: AsyncSession = Depends(get_async_session)) -> CategoryResponse:
    
    return await read_category(name=name, session=session)

@router.get("/read", status_code=status.HTTP_200_OK, response_model=List[CategoryResponse])
async def read2(session: AsyncSession = Depends(get_async_session)) -> CategoryResponse:
    
    return await read_categories(session=session)

@router.put("/update/{name}", status_code=status.HTTP_200_OK, response_model=CategoryResponse)
async def update(name: str, category: CategoryUpdate, session: AsyncSession = Depends(get_async_session)) -> CategoryResponse:
    
    return update_category(name=name, category=category, session=session)

@router.delete("/delete/{name}", status_code=status.HTTP_200_OK, response_model=CategoryResponse)
async def delete(name: str, session: AsyncSession = Depends(get_async_session)) -> CategoryResponse:
    
    return delete_category(name=name, session=session)



