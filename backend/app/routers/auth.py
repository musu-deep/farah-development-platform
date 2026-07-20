from datetime import datetime, timezone

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Response, status

from ..database import db
from ..dependencies import current_user
from ..schemas import LoginInput, RegisterInput, UserView
from ..security import clear_auth_cookies, hash_password, set_auth_cookies, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])


def present_user(user: dict) -> dict:
    return {
        "id": str(user.get("_id") or user.get("id")),
        "name": user["name"],
        "email": user["email"],
        "role": user.get("role", "client"),
        "company": user.get("company"),
        "phone": user.get("phone"),
    }


@router.post("/register", response_model=UserView, status_code=status.HTTP_201_CREATED)
async def register(data: RegisterInput, response: Response):
    email = data.email.lower().strip()
    if await db.users.find_one({"email": email}):
        raise HTTPException(status_code=409, detail="البريد الإلكتروني مسجل مسبقاً")
    document = {
        **data.model_dump(exclude={"password"}),
        "email": email,
        "password_hash": hash_password(data.password),
        "role": "client",
        "created_at": datetime.now(timezone.utc),
    }
    result = await db.users.insert_one(document)
    set_auth_cookies(response, str(result.inserted_id), email)
    document["_id"] = result.inserted_id
    return present_user(document)


@router.post("/login", response_model=UserView)
async def login(data: LoginInput, response: Response):
    email = data.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(data.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="بيانات الدخول غير صحيحة")
    set_auth_cookies(response, str(user["_id"]), email)
    return present_user(user)


@router.post("/logout")
async def logout(response: Response):
    clear_auth_cookies(response)
    return {"message": "تم تسجيل الخروج"}


@router.get("/me", response_model=UserView)
async def me(user: dict = Depends(current_user)):
    return present_user(user)
