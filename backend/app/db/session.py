from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from typing import Generator
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
his_engine = create_engine(settings.HIS_DATABASE_URL, pool_pre_ping=True)
SessionHisLocal = sessionmaker(autocommit=False, autoflush=False, bind=his_engine)

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()  

def get_his_db() -> Generator[Session, None, None]:
    his_db = SessionHisLocal()
    try:
        yield his_db
    finally:
        his_db.close()