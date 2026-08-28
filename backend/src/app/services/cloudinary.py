from fastapi import APIRouter, HTTPException, status, Depends
from cloudinary.utils import api_sign_request
from pydantic import EmailStr
import time

from core.config import settings
from schemas.schemas import SignatureResponse
from core.security import get_current_user

#Routers
router = APIRouter(prefix="/cloudinary")

#EndPoints

#Generar firma
@router.post("/signature", status_code=status.HTTP_201_CREATED, response_model=SignatureResponse)
async def cloudinary_signature(current_user: EmailStr = Depends(get_current_user)) -> SignatureResponse:
    #Crear los parámetros a firmar
    params_to_sign = {
        "timestamp": int(time.time()), #Tiempo actual en segundos contados desde Epoch (1ro de enero de 1970).
        "upload_preset": settings.CLOUDINARY_UPLOAD_PRESET,
        "folder": settings.CLOUDINARY_ASSET_FOLDER  
    }
    
    #Crear la firma
    signature = api_sign_request(params_to_sign, settings.CLOUDINARY_API_SECRET)
    
    #Crear el SignatureResponse
    response: SignatureResponse = SignatureResponse(
        signature=signature, 
        timestamp=params_to_sign["timestamp"], 
        api_key=settings.CLOUDINARY_API_KEY, 
        cloud_name=settings.CLOUDINARY_CLOUD_NAME, 
        upload_preset=params_to_sign["upload_preset"], 
        folder=params_to_sign["folder"]
    )
    
    return response
    







