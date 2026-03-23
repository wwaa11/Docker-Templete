import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Optional

class Settings(BaseSettings):

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480
    ALGORITHM: str = "HS256"
    JWT_SECRET_KEY: str = "default-jwt-secret"
    AUTH_SECRET_KEY: str = "default-auth-secret"

    FRONTEND_URL: str = "http://localhost:3000"
    FRONTEND_PORT: str = "3000"
    
    BACKEND_HOST: str = "backend"
    BACKEND_PORT: str = "8000"

    DATABASE_URL: str = "postgresql://user:pass@localhost:5432/db"
    HIS_DATABASE_URL: str = "postgresql://user:pass@localhost:5432/his_db"

    STAFF_API_URL: str = "http://localhost:8000"
    HIS_API_URL: str = "http://localhost:8000"

    model_config = SettingsConfigDict(
        env_file=[
           ".env","../.env"
        ],
        case_sensitive=True,
        extra='ignore'
    )

settings = Settings()
