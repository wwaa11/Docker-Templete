import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Optional

class Settings(BaseSettings):

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480
    ALGORITHM: str = "HS256"
    JWT_SECRET_KEY: str 
    AUTH_SECRET_KEY: str 

    FRONTEND_URL: str 
    FRONTEND_PORT: str
    
    BACKEND_HOST: str 
    BACKEND_PORT: str 

    DATABASE_URL: str 
    HIS_DATABASE_URL: str 

    STAFF_API_URL: str 
    HIS_API_URL: str 

    # UPLOAD_DIR: str = "/app/uploads"
    # MAX_UPLOAD_SIZE_BYTES: int = 10 * 1024 * 1024

    model_config = SettingsConfigDict(
        env_file=[
           ".env","../.env"
        ],
        case_sensitive=True,
        extra='ignore'
    )

settings = Settings()
