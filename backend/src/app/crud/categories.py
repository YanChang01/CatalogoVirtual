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
    db_category: Category = query.first()
    
    if db_category:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"El nombre de la categoría {category.name} ya existe.")
    
    #Crear la instancia de Base de Datos
    db_category = Category.model_validate(category)
    session.add(db_category)
    
    return db_category

#Read
async def read_category(name: str, session: AsyncSession) -> Category:
    query = await session.exec(select(Category).where(Category.name == name))
    db_category: Category = query.first()
    
    if not db_category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"La categoría {name} no existe en la base de datos.")

    return db_category

async def read_categories(session: AsyncSession) -> List[Category]:
    query = await session.exec(select(Category))
    db_categories: List[Category] = query.all()
    
    if not db_categories:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No existen categorías en la base de datos.")

    return db_categories

#Update
async def update_category(name: str, category: CategoryUpdate, session: AsyncSession) -> Category:
    #Validar que la categoría a actualizar existe
    query = await session.exec(select(Category).where(Category.name == name))
    db_category: Category = query.first()
    
    if not db_category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"La categoría {name} no existe en la base de datos.")

    #Validar que el nuevo nombre de la categoría no esté en uso ya
    query = await session.exec(select(Category).where(Category.name == category.name))
    db_category2: Category = query.first()
    
    if db_category2:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"El nombre {category.name} ya existe en la base de datos.")
    
    #Convertir modelo a diccionario para actualizar
    category_data = category.model_dump(exclude_unset=True)
    await session.exec(update(Category).where(Category.name == name).values(**category_data))
    
    #Obtener la categoría actualizada
    query = await session.exec(select(Category).where(Category.name == category.name))
    db_category: Category = query.first()
    
    return db_category

#Delete
async def delete_category(name: str, session: AsyncSession) -> Category:
    #Validar que la categoría a actualizar existe
    query = await session.exec(select(Category).where(Category.name == name))
    db_category: Category = query.first()
        
    if not db_category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"La categoría {name} no existe en la base de datos.")

    #Actualizar el campo is_deleted = True para borrado lógico
    await session.exec(update(Category).where(Category.name == name).values(is_deleted=True))
    await session.refresh(db_category)
    
    return db_category
    
    
    
    

