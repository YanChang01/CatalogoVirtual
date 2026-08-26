from fastapi import APIRouter, status, HTTPException, Depends
from typing import List, Optional
from sqlmodel.ext.asyncio.session import AsyncSession
from pydantic import EmailStr

from models.models import Product
from schemas.schemas import ProductCreate, ProductResponse, ProductUpdate, ProductWithCategory
from crud.products import create_product, read_product, read_products, read_product_deleted, read_products_deleted, update_product, delete_product, delete_products, restaurar_product, restaurar_products
from core.client import get_async_session
from core.security import get_current_user

#Router
router = APIRouter(prefix="/products")

#EndPoints

#POST
@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=ProductResponse)
async def create(product: ProductCreate, session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> ProductResponse:
    
    return await create_product(product=product, session=session)

#GET
@router.get("/read/{name}", status_code=status.HTTP_200_OK, response_model=ProductResponse)
async def read(name: str, session: AsyncSession = Depends(get_async_session)) -> ProductResponse:
    
    return await read_product(name=name, session=session)

@router.get("/read", status_code=status.HTTP_200_OK, response_model=List[ProductResponse])
async def read2(session: AsyncSession = Depends(get_async_session)) -> List[ProductResponse]:
    
    return await read_products(session=session)

@router.get("/read-deleted/{name}", status_code=status.HTTP_200_OK, response_model=ProductResponse)
async def read3(name: str, session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> ProductResponse:
    
    return await read_product_deleted(name=name, session=session)

@router.get("/read-deleted", status_code=status.HTTP_200_OK, response_model=List[ProductResponse])
async def read4(session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> List[ProductResponse]:
    
    return await read_products_deleted(session=session)

#PUT
@router.put("/update/{name}", status_code=status.HTTP_200_OK, response_model=ProductResponse)
async def update(name: str, product: ProductUpdate, session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> ProductResponse:
    
    return await update_product(name=name, product=product, session=session)

#DELETE
@router.delete("/delete/{name}", status_code=status.HTTP_200_OK, response_model=ProductResponse)
async def delete(name: str, session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> ProductResponse:
    
    return await delete_product(name=name, session=session)

@router.delete("/delete", status_code=status.HTTP_200_OK, response_model=List[ProductResponse])
async def delete2(session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> List[ProductResponse]:
    
    return await delete_products(session=session)

#PATCH
@router.patch("/restaurar/{name}", status_code=status.HTTP_200_OK, response_model=ProductResponse)
async def restaurar(name: str, session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> ProductResponse:
    
    return await restaurar_product(name=name, session=session)

@router.patch("/restaurar", status_code=status.HTTP_200_OK, response_model=List[ProductResponse])
async def restaurar2(session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> List[ProductResponse]:
    
    return await restaurar_products(session=session)




