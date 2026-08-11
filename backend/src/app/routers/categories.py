from fastapi import APIRouter, status, HTTPException, Depends
from typing import List, Optional
from sqlmodel.ext.asyncio.session import AsyncSession
from pydantic import EmailStr

from models.models import Category
from schemas.schemas import CategoryCreate, CategoryResponse, CategoryUpdate, CategoryWithProducts
from crud.categories import create_category, read_category, read_categories, read_category_deleted, read_categories_deleted, update_category, delete_category, delete_categories, restaurar_category, restaurar_categories
from core.client import get_async_session
from core.security import get_current_user

#Router
router = APIRouter(prefix="/categories")

#EndPoints

#POST
@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=CategoryResponse)
async def create(category: CategoryCreate, session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> CategoryResponse:
    
    return await create_category(category=category, session=session)

#GET
@router.get("/read/{name}", status_code=status.HTTP_200_OK, response_model=CategoryResponse)
async def read(name: str, session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> CategoryResponse:
    
    return await read_category(name=name, session=session)

@router.get("/read", status_code=status.HTTP_200_OK, response_model=List[CategoryResponse])
async def read2(session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> List[CategoryResponse]:
    
    return await read_categories(session=session)

@router.get("/read-deleted/{name}", status_code=status.HTTP_200_OK, response_model=CategoryResponse)
async def read3(name: str, session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> CategoryResponse:
    
    return await read_category_deleted(name=name, session=session)

@router.get("/read-deleted", status_code=status.HTTP_200_OK, response_model=List[CategoryResponse])
async def read4(session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> List[CategoryResponse]:
    
    return await read_categories_deleted(session=session)

#PUT
@router.put("/update/{name}", status_code=status.HTTP_200_OK, response_model=CategoryResponse)
async def update(name: str, category: CategoryUpdate, session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> CategoryResponse:
    
    return await update_category(name=name, category=category, session=session)

#DELETE
@router.delete("/delete/{name}", status_code=status.HTTP_200_OK, response_model=CategoryResponse)
async def delete(name: str, session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> CategoryResponse:
    
    return await delete_category(name=name, session=session)

@router.delete("/delete", status_code=status.HTTP_200_OK, response_model=List[CategoryResponse])
async def delete2(session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> List[CategoryResponse]:
    
    return await delete_categories(session=session)

#PATCH
@router.patch("/restaurar/{name}", status_code=status.HTTP_200_OK, response_model=CategoryResponse)
async def restaurar(name: str, session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> CategoryResponse:
    
    return await restaurar_category(name=name, session=session)

@router.patch("/restaurar", status_code=status.HTTP_200_OK, response_model=List[CategoryResponse])
async def restaurar2(session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> List[CategoryResponse]:
    
    return await restaurar_categories(session=session)

