from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import httpx
from typing import Annotated
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.db.session import get_db
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication"])

class LoginRequest(BaseModel):
    userid: str
    password: str

def sync_user_to_db(staff_data: dict, db: Session):
    """Helper to sync staff data to local database."""
    if staff_data.get("status") == 1 and "user" in staff_data:
        user_info = staff_data["user"]
        userid = user_info.get("userid")
        name = user_info.get("name")
        
        if userid and name:
            db_user = db.query(User).filter(User.user_id == userid).first()
            if db_user:
                if db_user.name != name:
                    db_user.name = name
                    db.commit()
            else:
                new_user = User(user_id=userid, name=name)
                db.add(new_user)
                db.commit()

@router.post("/login")
async def login(
    request: LoginRequest, 
    db: Annotated[Session, Depends(get_db)]
):
    """
    Proxy authentication request and sync user to local database.
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{settings.STAFF_API_URL}auth",
                json={"userid": request.userid, "password": request.password},
                headers={
                    "token": settings.AUTH_SECRET_KEY,
                    "Content-Type": "application/json"
                },
                timeout=10.0
            )
            
            if response.status_code != 200:
                try:
                    error_detail = response.json()
                except Exception:
                    error_detail = {"message": "External Authentication Failed"}
                
                raise HTTPException(
                    status_code=response.status_code,
                    detail=error_detail.get("message", "Authentication failed at staff API")
                )
            
            staff_data = response.json()
            sync_user_to_db(staff_data, db)
            return staff_data
            
    except httpx.RequestError as exc:
        raise HTTPException(
            status_code=503,
            detail=f"Could not connect to authentication service: {str(exc)}"
        )
