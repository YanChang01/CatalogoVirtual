from fastapi import HTTPException, status
from typing import Optional, List
from pydantic import EmailStr
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, update, delete, func, and_, or_, not_
from datetime import datetime, timezone, timedelta

from models.models import Category
from schemas.schemas import CategoryCreate, CategoryResponse, CategoryUpdate, CategoryWithProducts

#Create
async def create_category(category: CategoryCreate, session: AsyncSession) -> Category:
    #Validar unicidad del name
    query = await session.exec(select(Category).where(Category.name == category.name))
    
    if query.first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"La categoría {category.name} ya existe.")
    
    #Crear la instancia de Base de Datos
    db_category: Category = Category(**category.model_dump())
    session.add(db_category)
    await session.commit()
    await session.refresh(db_category)
    
    return db_category

#Read
async def read_category(name: str, session: AsyncSession) -> Category:
    query = await session.exec(select(Category).where(Category.name == name, Category.is_deleted == False))
    db_category: Category = query.first()
    
    if not db_category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Categoría {name} no encontrada.")

    return db_category

async def read_categories(session: AsyncSession) -> List[Category]:
    query = await session.exec(select(Category).where(Category.is_deleted == False))
    
    return query.all()

#Update
async def update_category(name: str, category: CategoryUpdate, session: AsyncSession) -> Category:
    #Buscar la categoría existente no eliminada.
    query = await session.exec(select(Category).where(Category.name == name, Category.is_deleted == False))
    db_category: Category = query.first()
    
    if not db_category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Categoría {name} no encontrada.")

    #Validar que el nuevo nombre de la categoría no esté en uso ya
    if category.name is not None:
        query2 = await session.exec(select(Category).where(Category.name == category.name, Category.is_deleted == False))
        existing = query2.first()
        
        if existing and existing.id != db_category.id:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"El nombre {category.name} ya está en uso.")

    # Actualizar solo los campos enviados en la instancia
    update_data = category.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_category, key, value)
    
    #Actualizar la base de datos
    session.add(db_category)
    await session.commit()
    await session.refresh(db_category)
    
    return db_category

#Delete
async def delete_category(name: str, session: AsyncSession) -> Category:
    #Validar que la categoría a actualizar existe
    query = await session.exec(select(Category).where(Category.name == name, Category.is_deleted == False))
    db_category: Category = query.first()
        
    if not db_category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Categoría {name} no encontrada.")

    #Actualizar el campo is_deleted = True para soft delete
    db_category.is_deleted = True
    session.add(db_category)
    await session.commit()
    await session.refresh(db_category)
    
    return db_category
    
    
    
    

