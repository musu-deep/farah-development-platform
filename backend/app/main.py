from contextlib import asynccontextmanager
from datetime import datetime, timezone
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import close_database, db, prepare_database
from .routers import auth, chat, consultations, dashboard
from .security import hash_password, verify_password

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
logger = logging.getLogger(__name__)


async def seed_admin() -> None:
    email = settings.admin_email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user:
        await db.users.insert_one(
            {
                "name": settings.admin_name,
                "email": email,
                "password_hash": hash_password(settings.admin_password),
                "role": "admin",
                "company": "شركة فرح التنمية",
                "phone": None,
                "created_at": datetime.now(timezone.utc),
            }
        )
        logger.info("Seeded admin account: %s", email)
    elif not verify_password(settings.admin_password, user.get("password_hash", "")):
        await db.users.update_one(
            {"_id": user["_id"]},
            {"$set": {"password_hash": hash_password(settings.admin_password)}},
        )


@asynccontextmanager
async def lifespan(_: FastAPI):
    await prepare_database()
    await seed_admin()
    yield
    await close_database()


app = FastAPI(
    title="Farah Development API",
    version="2.0.0",
    description="API لمنصة شركة فرح التنمية",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_prefix = "/api"
app.include_router(auth.router, prefix=api_prefix)
app.include_router(consultations.router, prefix=api_prefix)
app.include_router(dashboard.router, prefix=api_prefix)
app.include_router(chat.router, prefix=api_prefix)


@app.get("/api")
async def api_root():
    return {"name": settings.app_name, "status": "operational", "version": "2.0.0"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
