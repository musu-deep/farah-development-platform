from datetime import datetime, timedelta, timezone
from typing import Literal

import bcrypt
import jwt
from fastapi import Response

from .config import settings

ALGORITHM = "HS256"


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))
    except ValueError:
        return False


def create_token(user_id: str, email: str, token_type: Literal["access", "refresh"]) -> str:
    now = datetime.now(timezone.utc)
    expires = now + (
        timedelta(minutes=settings.access_token_minutes)
        if token_type == "access"
        else timedelta(days=settings.refresh_token_days)
    )
    return jwt.encode(
        {"sub": user_id, "email": email, "type": token_type, "iat": now, "exp": expires},
        settings.jwt_secret,
        algorithm=ALGORITHM,
    )


def decode_token(token: str, expected_type: str) -> dict:
    payload = jwt.decode(token, settings.jwt_secret, algorithms=[ALGORITHM])
    if payload.get("type") != expected_type:
        raise jwt.InvalidTokenError("Unexpected token type")
    return payload


def set_auth_cookies(response: Response, user_id: str, email: str) -> None:
    common = {
        "httponly": True,
        "secure": settings.cookie_secure,
        "samesite": "none" if settings.cookie_secure else "lax",
        "path": "/",
    }
    response.set_cookie(
        "access_token",
        create_token(user_id, email, "access"),
        max_age=settings.access_token_minutes * 60,
        **common,
    )
    response.set_cookie(
        "refresh_token",
        create_token(user_id, email, "refresh"),
        max_age=settings.refresh_token_days * 86400,
        **common,
    )


def clear_auth_cookies(response: Response) -> None:
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
