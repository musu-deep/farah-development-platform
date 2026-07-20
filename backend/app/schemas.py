from typing import Literal

from pydantic import BaseModel, EmailStr, Field

ConsultationStatus = Literal["new", "in_progress", "waiting_client", "completed", "cancelled"]


class RegisterInput(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    company: str | None = Field(default=None, max_length=160)
    phone: str | None = Field(default=None, max_length=40)


class LoginInput(BaseModel):
    email: EmailStr
    password: str


class UserView(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: Literal["client", "admin"]
    company: str | None = None
    phone: str | None = None


class ConsultationCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=40)
    company: str | None = Field(default=None, max_length=160)
    service: str = Field(min_length=2, max_length=160)
    message: str = Field(min_length=10, max_length=4000)
    preferred_date: str | None = None
    urgency: Literal["normal", "high", "critical"] = "normal"


class ConsultationStatusUpdate(BaseModel):
    status: ConsultationStatus
    admin_note: str | None = Field(default=None, max_length=1000)


class ChatInput(BaseModel):
    session_id: str = Field(min_length=4, max_length=120)
    message: str = Field(min_length=1, max_length=2000)
