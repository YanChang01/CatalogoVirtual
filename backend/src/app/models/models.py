from sqlmodel import SQLModel, Field, Relationship, Column, func, DateTime
from sqlalchemy.types import TypeDecorator, String
from pydantic import EmailStr, HttpUrl, StringConstraints
from datetime import datetime
from typing import Optional, List
from decimal import Decimal
from typing import Annotated

#Tipo personalizado para Phone
PhoneStr = Annotated[str, StringConstraints(min_length=8, max_length=8, pattern=r'^\d{8}$')]

#Decorador de tipo para HttpUrl
class HttpUrlType(TypeDecorator):
    """Convierte HttpUrl de Pydantic a string para la BD y viceversa."""
    impl = String(2083)  # Longitud máxima estándar para URLs
    cache_ok = True
    python_type = HttpUrl
    
    def process_bind_param(self, value, dialect) -> Optional[str]:
        """Convierte HttpUrl a string antes de guardar en la BD."""
        return str(value) if value is not None else None

    def process_result_value(self, value, dialect) -> Optional[HttpUrl]:
        """Convierte el string de la BD de vuelta a HttpUrl."""
        return HttpUrl(value) if value is not None else None

#Clase Base
class Base(SQLModel):
    #Atributos comunes aquí
    created_at: datetime = Column(DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)
    updated_at: datetime = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False, index=True)
    is_deleted: bool = Field(default=False, index=True, nullable=False)

class User(Base, table=True):
    __tablename__ = "users"
    id: Optional[int] = Field(default=None, primary_key=True)
    fullname: str = Field(index=True, nullable=False, min_length=2, max_length=100)
    phone: PhoneStr = Field(unique=True, index=True, nullable=False)
    email: EmailStr = Field(unique=True, index=True, nullable=False)
    password: str = Field(nullable=False)
    
class Category(Base, table=True):
    __tablename__ = "categories"
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(unique=True, index=True, nullable=False, min_length=3, max_length=100)
    
    products: List["Product"] = Relationship(back_populates="category")
    
class Product(Base, table=True):
    __tablename__ = "products"
    id: Optional[int] = Field(default=None, primary_key=True)
    category_id: int = Field(foreign_key="categories.id", nullable=False)
    name: str = Field(unique=True, index=True, nullable=False, min_length=3, max_length=100)
    price: Decimal = Field(index=True, nullable=False, decimal_places=2, max_digits=12, ge=0)
    description: Optional[str] = Field(default=None, max_length=500)
    is_active: bool = Field(default=True, index=True, nullable=False)
    image_url: Optional[HttpUrl] = Field(default=None, sa_type=HttpUrlType, max_length=500)
    
    category: "Category" = Relationship(back_populates="products")
    
    
    
    
    






