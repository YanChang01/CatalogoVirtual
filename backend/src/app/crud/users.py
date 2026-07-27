from fastapi import HTTPException, status
from typing import Optional, List
from pydantic import EmailStr
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, update, delete, func, and_, or_, not_
from datetime import datetime, timezone, timedelta

from models.models import User
from schemas.schemas import UserCreate, UserResponse, UserUpdate
from core.security import password_hash, verify_password

#Create
async def create_user(user: UserCreate, session: AsyncSession) -> User:
    #Validar unicidad del phone y el email
    query = await session.exec(select(User).where(or_(User.phone == user.phone, User.email == user.email)))
    
    if query.first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"El phone {user.phone} y/o el email {user.email} ya existen")

    #Convertir a title_case el fullname
    user.fullname = user.fullname.title()
    
    #Aplicar hash al password
    user.password = password_hash(user.password)
    
    #Crear la instancia de Base de Datos
    db_user: User = User(**user.model_dump())
    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
    
    return db_user

#Read
async def read_user(email: EmailStr, session: AsyncSession) -> User:
    query = await session.exec(select(User).where(User.email == email, User.is_deleted == False))
    db_user: User = query.first()
    
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Usuario con email {email} no encontrado")

    return db_user

async def read_users(session: AsyncSession) -> List[User]:
    query = await session.exec(select(User).where(User.is_deleted == False))
    
    return query.all()

async def read_user_deleted(email: EmailStr, session: AsyncSession) -> User:
    query = await session.exec(select(User).where(User.email == email, User.is_deleted == True))
    db_user: User = query.first()
    
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Usuario con email {email} no encontrado")

    return db_user

async def read_users_deleted(session: AsyncSession) -> List[User]:
    query = await session.exec(select(User).where(User.is_deleted == True))
    
    return query.all()

#Update
async def update_user(email: EmailStr, user: UserUpdate, session: AsyncSession) -> User:
    #Validar que el usuario a actualizar existe
    query = await session.exec(select(User).where(User.email == email, User.is_deleted == False))
    db_user: User = query.first()
    
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Usuario con email {email} no encontrado")

    #Validar que el nuevo phone del usuario no esté en uso ya
    if user.phone is not None:
        query = await session.exec(select(User).where(User.phone == user.phone))
        existing = query.first()
            
        if existing and existing.id != db_user.id:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"El phone {user.phone} ya está en uso")

    #Validar que el nuevo email del usuario no esté en uso ya
    if user.email is not None:
        query = await session.exec(select(User).where(User.email == user.email))
        existing = query.first()
        
        if existing and existing.id != db_user.id:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"El email {user.email} ya está en uso")

    #Convertir el fullname a title_case si se envía
    if user.fullname is not None:
        user.fullname = user.fullname.title()

    # Actualizar solo los campos enviados en la instancia
    update_data = user.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_user, key, value)
        
    #Actualizar la base de datos
    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
        
    return db_user

#Delete
async def delete_user(email: EmailStr, session: AsyncSession) -> User:
    #Validar que el usuario a eliminar existe
    query = await session.exec(select(User).where(User.email == email, User.is_deleted == False))
    db_user: User = query.first()
            
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Usuario con email {email} no encontrado")
    
    #Actualizar el campo is_deleted = True para soft delete
    db_user.is_deleted = True
    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
    
    return db_user

async def delete_users(session: AsyncSession) -> List[User]:
    query = await session.exec(select(User).where(User.is_deleted == False))
    db_users: List[User] = query.all()
    
    if not db_users:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No existen usuarios activos")
    
    for user in db_users:
        user.is_deleted = True
    
    #Actualizar la Base de Datos
    session.add_all(db_users)
    await session.commit()
    
    for user in db_users:
        await session.refresh(user)
    
    return db_users

#Patch
async def restaurar_user(email: EmailStr, session: AsyncSession) -> User:
    #Buscar el usuario existente eliminado.
    query = await session.exec(select(User).where(User.email == email, User.is_deleted == True))
    db_user: User = query.first()
        
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Usuario {email} no encontrado")
    
    #Actualizar campo is_deleted = False
    db_user.is_deleted = False
    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
    
    return db_user

async def restaurar_users(session: AsyncSession) -> List[User]:
    query = await session.exec(select(User).where(User.is_deleted == True))
    db_users: List[User] = query.all()
    
    if not db_users:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No existen usuarios inactivos")
    
    for user in db_users:
        user.is_deleted = False
    
    #Actualizar la Base de Datos
    session.add_all(db_users)
    await session.commit()
    
    for user in db_users:
        await session.refresh(user)
        
    return db_users
