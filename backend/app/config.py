from functools import lru_cache
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "Farah Development Platform"
    environment: Literal["development", "test", "production"] = "development"
    mongo_url: str = "mongodb://localhost:27017"
    db_name: str = "farah_development"
    cors_origins: str = "http://localhost:5173"

    jwt_secret: str = "development-only-change-me"
    access_token_minutes: int = 60
    refresh_token_days: int = 7
    cookie_secure: bool = False

    admin_email: str = "admin@farah.local"
    admin_password: str = "ChangeMe!2026"
    admin_name: str = "مدير النظام"

    ai_provider: str = "fallback"
    ai_api_key: str = ""
    ai_base_url: str = ""
    ai_model: str = ""

    email_webhook_url: str = ""
    email_webhook_key: str = ""
    notification_email: str = ""
    use_mock_db: bool = False

    @property
    def cors_origin_list(self) -> list[str]:
        return [item.strip() for item in self.cors_origins.split(",") if item.strip()]



@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
