from bson import ObjectId
from fastapi import Depends, HTTPException, Request, status
import jwt

from .database import db
from .security import decode_token


async def current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth.removeprefix("Bearer ").strip()
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="يرجى تسجيل الدخول")

    try:
        payload = decode_token(token, "access")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    except (jwt.InvalidTokenError, ValueError, KeyError):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="جلسة غير صالحة")

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="المستخدم غير موجود")
    user["id"] = str(user.pop("_id"))
    user.pop("password_hash", None)
    return user


async def optional_user(request: Request) -> dict | None:
    try:
        return await current_user(request)
    except HTTPException:
        return None


async def admin_user(user: dict = Depends(current_user)) -> dict:
    if user.get("role") != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="صلاحيات المدير مطلوبة")
    return user
