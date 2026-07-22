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
    #Validar longitud del fullname
    if len(user.fullname) < 2 or len(user.fullname) > 100:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="El fullname debe tener al menos 2 caracteres y no más de 100 caracteres")

    #Validar unicidad del phone y el email
    query = await session.exec(select(User).where(or_(User.phone == user.phone, User.email == user.email), User.is_deleted == False))
    
    if query.first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"El phone {user.phone} o el email {user.email} ya existen")

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

#Update
async def update_user(email: EmailStr, user: UserUpdate, session: AsyncSession) -> User:
    #Validar que el usuario a actualizar existe
    query = await session.exec(select(User).where(User.email == email, User.is_deleted == False))
    db_user: User = query.first()
    
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Usuario con email {email} no encontrado")

    #Validar que el nuevo phone del usuario no esté en uso ya
    if user.phone is not None:
        query2 = await session.exec(select(User).where(User.phone == user.phone, User.is_deleted == False))
            
        if query2.first():
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"El phone {user.phone} ya está en uso")

    #Validar que el nuevo email del usuario no esté en uso ya
    if user.email is not None:
        query3 = await session.exec(select(User).where(User.email == user.email, User.is_deleted == False))
        
        if query3.first():
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"El email {user.email} ya está en uso")

    # Actualizar solo los campos enviados en la instancia
    update_data = user.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_user, key, value)
        
    #Actualizar la base de datos
    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
        
    return db_user
    
async def delete_user(email: EmailStr, session: AsyncSession) -> User:
    #Validar que el usuario a actualizar existe
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

