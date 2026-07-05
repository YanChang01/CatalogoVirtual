from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import jwt, JWTError
from core.config import settings
from datetime import datetime
from pydantic import EmailStr

"""
Estructura del JWT.
{
    header: {
        alg: algoritmo,
        type: JWT
    }
    payload: {
        sub: email,
        name: Jane Doe,
        exp: dateTime
    }
    signature: header. + payload. + secret
}
"""

oauth2 = OAuth2PasswordBearer(tokenUrl="login")
cryptography = CryptContext(schemes=[settings.CRYPTOGRAPHY])

def password_hash(password: str) -> str:
    #Hashea la contraseña usando el contexto configurado.
    return cryptography.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    #Verifica una contraseña contra su hash.
    return cryptography.verify(plain_password, hashed_password)

def get_current_user(token: str = Depends(oauth2)) -> EmailStr:
    """
    Decodifica el token JWT y retorna el email del usuario (sub).
    Lanza excepción si el token es inválido o ha expirado.
    """
    try:
        payload = jwt.decode(
            token,
            settings.SECRET,
            algorithms=[settings.ALGORITHM]
        )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_email: EmailStr = payload.get("sub")
    
    if user_email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token no contiene el email del usuario",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user_email  # Retorna el email del usuario