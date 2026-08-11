from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from typing import List, Optional
from sqlmodel.ext.asyncio.session import AsyncSession
from pydantic import EmailStr

from models.models import User
from schemas.schemas import UserCreate, UserResponse, UserUpdate
from crud.users import create_user, read_user, read_users, read_user_deleted, read_users_deleted, update_user, delete_user, delete_users, restaurar_user, restaurar_users, login
from core.client import get_async_session
from core.security import get_current_user

#Router
router = APIRouter(prefix="/users")

#EndPoints

#Registro (Solamente para pruebas)
@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def register(user: UserCreate, session: AsyncSession = Depends(get_async_session)) -> UserResponse:
    
    return await create_user(user=user, session=session)

#Inicio de Sesión
@router.post("/login", status_code=status.HTTP_201_CREATED)
async def iniciar_session(form: OAuth2PasswordRequestForm = Depends(), session: AsyncSession = Depends(get_async_session)) -> dict:
    
    return await login(form=form, session=session)

#POST
@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def create(user: UserCreate, session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> UserResponse:
    
    return await create_user(user=user, session=session)

#GET
@router.get("/read/{email}", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def read(email: EmailStr, session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> UserResponse:
    
    return await read_user(email=email, session=session)

@router.get("/read", status_code=status.HTTP_200_OK, response_model=List[UserResponse])
async def read2(session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> List[UserResponse]:
    
    return await read_users(session=session)

@router.get("/read-deleted/{email}", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def read3(email: EmailStr, session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> UserResponse:
    
    return await read_user_deleted(email=email, session=session)

@router.get("/read-deleted", status_code=status.HTTP_200_OK, response_model=List[UserResponse])
async def read4(session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> List[UserResponse]:
    
    return await read_users_deleted(session=session)

#PUT
@router.put("/update/{email}", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def update(email: EmailStr, user: UserUpdate, session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> UserResponse:
    
    return await update_user(email=email, user=user, session=session)

#DELETE
@router.delete("/delete/{email}", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def delete(email: EmailStr, session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> UserResponse:
    
    return await delete_user(email=email, session=session)

@router.delete("/delete", status_code=status.HTTP_200_OK, response_model=List[UserResponse])
async def delete2(session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> List[UserResponse]:
    
    return await delete_users(session=session)

#PATCH
@router.patch("/restaurar/{email}", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def restaurar(email: EmailStr, session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> UserResponse:
    
    return await restaurar_user(email=email, session=session)

@router.patch("/restaurar", status_code=status.HTTP_200_OK, response_model=List[UserResponse])
async def restaurar2(session: AsyncSession = Depends(get_async_session), current_user: EmailStr = Depends(get_current_user)) -> List[UserResponse]:
    
    return await restaurar_users(session=session)