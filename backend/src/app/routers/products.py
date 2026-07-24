from fastapi import APIRouter, status, HTTPException, Depends
from typing import List, Optional
from sqlmodel.ext.asyncio.session import AsyncSession

from models.models import Product
from schemas.schemas import ProductCreate, ProductResponse, ProductUpdate, ProductWithCategory
from crud.products import create_product, read_product, read_products, update_product, delete_product
from core.client import get_async_session

#Router
router = APIRouter(prefix="/products")

#EndPoints
@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=ProductResponse)
async def create(product: ProductCreate, session: AsyncSession = Depends(get_async_session)) -> ProductResponse:
    
    return await create_product(product=product, session=session)

@router.get("/read/{name}", status_code=status.HTTP_200_OK, response_model=ProductResponse)
async def read(name: str, session: AsyncSession = Depends(get_async_session)) -> ProductResponse:
    
    return await read_product(name=name, session=session)

@router.get("/read", status_code=status.HTTP_200_OK, response_model=List[ProductResponse])
async def read2(session: AsyncSession = Depends(get_async_session)) -> List[ProductResponse]:
    
    return await read_products(session=session)

@router.put("/update/{name}", status_code=status.HTTP_200_OK, response_model=ProductResponse)
async def update(name: str, product: ProductUpdate, session: AsyncSession = Depends(get_async_session)) -> ProductResponse:
    
    return await update_product(name=name, product=product, session=session)

@router.delete("/delete/{name}", status_code=status.HTTP_200_OK, response_model=ProductResponse)
async def delete(name: str, session: AsyncSession = Depends(get_async_session)) -> ProductResponse:
    
    return await delete_product(name=name, session=session)






