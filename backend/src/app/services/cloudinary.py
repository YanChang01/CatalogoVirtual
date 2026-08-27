from fastapi import APIRouter, HTTPException, status
from cloudinary import utils as cloudinary_utils
import time

from core.config import settings
from schemas.schemas import SignatureResponse

#Routers
router = APIRouter(prefix="/cloudinary")

#EndPoints

#Generar firma
@router.post("/signature", status_code=status.HTTP_201_CREATED, response_model=SignatureResponse)
async def cloudinary_signature() -> SignatureResponse:
    #Crear los parámetros a firmar
    params_to_sign = {
        "timestamp": int(time.time()), #Tiempo actual en segundos contados desde Epoch (1ro de enero de 1970).
        "upload_preset": settings.CLOUDINARY_UPLOAD_PRESET,
        "folder": settings.CLOUDINARY_ASSET_FOLDER  
    }
    
    #Crear la firma
    signature = cloudinary_utils.api_sign_request(params_to_sign)
    
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
    







