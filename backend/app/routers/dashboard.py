from fastapi import APIRouter, Depends

from ..database import db
from ..dependencies import admin_user

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/stats")
async def stats(_: dict = Depends(admin_user)):
    statuses = ["new", "in_progress", "waiting_client", "completed", "cancelled"]
    counts = {key: await db.consultations.count_documents({"status": key}) for key in statuses}
    total = await db.consultations.count_documents({})
    clients = await db.users.count_documents({"role": "client"})
    return {"total": total, "clients": clients, **counts}
