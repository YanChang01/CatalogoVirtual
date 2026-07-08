from datetime import datetime
from decimal import Decimal
from typing import Optional, List
from pydantic import EmailStr, HttpUrl
from sqlmodel import SQLModel, Field

from models.models import PhoneStr

# ============================
# Clases Base
# ============================

class UserBase(SQLModel):
    fullname: str = Field(min_length=2, max_length=100)
    phone: PhoneStr
    email: EmailStr

class CategoryBase(SQLModel):
    name: str = Field(min_length=3, max_length=100)

class ProductBase(SQLModel):
    name: str = Field(min_length=3, max_length=100)
    price: Decimal = Field(decimal_places=2, max_digits=12, ge=0)
    description: Optional[str] = Field(default=None, max_length=500)
    is_active: bool = True
    image_url: Optional[HttpUrl] = None
    category_id: int

# ============================
# Schemas para User
# ============================

class UserCreate(UserBase):
    password: str

class UserUpdate(SQLModel):
    fullname: Optional[str] = Field(default=None, min_length=2, max_length=100)
    phone: Optional[PhoneStr] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None

class UserResponse(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# ============================
# Schemas para Category
# ============================

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(SQLModel):
    name: Optional[str] = Field(default=None, min_length=3, max_length=100)

class CategoryResponse(CategoryBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class CategoryWithProducts(CategoryResponse):
    products: List["ProductResponse"] = []

# ============================
# Schemas para Product
# ============================

class ProductCreate(ProductBase):
    pass

class ProductUpdate(SQLModel):
    name: Optional[str] = Field(default=None, min_length=3, max_length=100)
    price: Optional[Decimal] = Field(default=None, decimal_places=2, max_digits=12, ge=0)
    description: Optional[str] = Field(default=None, max_length=500)
    is_active: Optional[bool] = None
    image_url: Optional[HttpUrl] = None
    category_id: Optional[int] = None

class ProductResponse(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ProductWithCategory(ProductResponse):
    category: CategoryResponse

# ============================
# Resolver referencias circulares
# ============================
CategoryWithProducts.model_rebuild()
ProductWithCategory.model_rebuild()