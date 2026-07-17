from datetime import datetime
from decimal import Decimal
from typing import Optional, List
from pydantic import EmailStr, HttpUrl, BaseModel

from models.models import PhoneStr

# ============================
# Clases Base
# ============================

class UserBase(BaseModel):
    fullname: str
    phone: PhoneStr
    email: EmailStr

class CategoryBase(BaseModel):
    name: str

class ProductBase(BaseModel):
    name: str
    price: Decimal
    description: Optional[str]
    is_active: bool = True
    image_url: Optional[HttpUrl] = None
    category_id: int

# ============================
# Schemas para User
# ============================

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    fullname: Optional[str]
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

class CategoryUpdate(BaseModel):
    name: Optional[str]

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

class ProductUpdate(BaseModel):
    name: Optional[str]
    price: Optional[Decimal]
    description: Optional[str]
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