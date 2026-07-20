from fastapi import APIRouter, status, HTTPException, Depends
from typing import List, Optional
from sqlmodel.ext.asyncio.session import AsyncSession
from pydantic import EmailStr

from models.models import User
from schemas.schemas import UserCreate, UserResponse, UserUpdate
from crud.users import create_user, read_user, read_users, update_user, delete_user
from core.client import get_async_session

#Router
router = APIRouter(prefix="/users")

#EndPoints
@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def create(user: UserCreate, session: AsyncSession = Depends(get_async_session)) -> UserResponse:
    
    return await create_user(user=user, session=session)

@router.get("/read/{email}", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def read(email: EmailStr, session: AsyncSession = Depends(get_async_session)) -> UserResponse:
    
    return await read_user(email=email, session=session)

@router.get("/read", status_code=status.HTTP_200_OK, response_model=List[UserResponse])
async def read2(session: AsyncSession = Depends(get_async_session)) -> List[UserResponse]:
    
    return await read_users(session=session)

@router.put("/update/{email}", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def update(email: EmailStr, user: UserUpdate, session: AsyncSession = Depends(get_async_session)) -> UserResponse:
    
    return await update_user(email=email, user=user, session=session)

@router.delete("/delete/{email}", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def delete(email: EmailStr, session: AsyncSession = Depends(get_async_session)) -> UserResponse:
    
    return await delete_user(email=email, session=session)