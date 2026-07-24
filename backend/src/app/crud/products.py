from fastapi import HTTPException, status
from typing import Optional, List
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, update, delete, func, and_, or_, not_
from datetime import datetime, timezone, timedelta

from models.models import Product, Category
from schemas.schemas import ProductCreate, ProductResponse, ProductUpdate, ProductWithCategory

#Create
async def create_product(product: ProductCreate, session: AsyncSession) -> Product:
    #Validar existencia y consistencia del category_id
    query = await session.exec(select(Category).where(Category.id == product.category_id, Category.is_deleted == False))
    
    if not query.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"La categoría con id {product.category_id} no existe")
    
    #Validar unicidad del name
    product.name = product.name.capitalize()
    query = await session.exec(select(Product).where(Product.name == product.name))
    
    if query.first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"El producto {product.name} ya existe")

    #Crear la instancia de Base de Datos
    db_product: Product = Product(**product.model_dump())
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    
    return db_product

#Read
async def read_product(name: str, session: AsyncSession) -> Product:
    query = await session.exec(select(Product).where(Product.name == name, Product.is_deleted == False))
    db_product: Product = query.first()
    
    if not db_product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"El producto {name} no existe")
    
    return db_product

async def read_products(session: AsyncSession) -> List[Product]:
    query = await session.exec(select(Product).where(Product.is_deleted == False))
    
    return query.all()

#Update
async def update_product(name: str, product: ProductUpdate, session: AsyncSession) -> Product:
    #Buscar el producto existente no eliminado.
    query = await session.exec(select(Product).where(Product.name == name, Product.is_deleted == False))
    db_product: Product = query.first()
    
    if not db_product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Producto {name} no encontrado")

    if product.name is not None:
        #Validar que el nuevo name no esté en uso ya
        query2 = await session.exec(select(Product).where(Product.name == product.name))
        
        if query2.first():
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"El nombre {product.name} ya está en uso")

    if product.category_id is not None:
        #Validar que el category_id exista
        query3 = await session.exec(select(Category).where(Category.id == product.category_id, Category.is_deleted == False))
    
        if not query3.first():
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Category_id {product.category_id} no encontrado")

    if product.price is not None:
        if product.price < 0:
            raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail=f"El precio {product.price} del producto tiene que ser mayor o igual a 0")
        
    # Actualizar solo los campos enviados en la instancia
    update_data = product.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)
        
    #Actualizar la Base de Datos
    session.add(db_product)
    await session.commit()
    await session.refresh(db_product)
    
    return db_product
        
#Delete
async def delete_product(name: str, session: AsyncSession) -> Product:
    #Validar que el producto a eliminar existe
    query = await session.exec(select(Product).where(Product.name == name, Product.is_deleted == False))
    db_product: Product = query.first()
    
    if not db_product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Producto con nombre {name} no encontrado")
        
    #Actualizar el campo is_deleted = True para soft delete
    db_product.is_deleted = True
    session.add(db_product)
    await session.commit()
    await session.refresh(db_product)
    
    return db_product
        
        
        
        
        
        
        
        
        
        