import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Optional

class Settings(BaseSettings):
    BASE_PATH: str = "/template-base/"
    JWT_SECRET_KEY: str
    DATABASE_URL: str
    FRONTEND_URL: str = "http://localhost:5173"

    model_config = SettingsConfigDict(
        env_file=[
           ".env","../.env"
        ],
        case_sensitive=True,
        extra='ignore'
    )

settings = Settings()
