from fastapi import APIRouter

router = APIRouter()

@router.get("/test")
async def main():
    return {"message": "API is running"}