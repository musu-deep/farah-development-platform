from datetime import datetime, timezone
import uuid

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Query, status

from ..database import db
from ..dependencies import admin_user, current_user, optional_user
from ..schemas import ConsultationCreate, ConsultationStatusUpdate
from ..services.notifications import notify_new_consultation

router = APIRouter(prefix="/consultations", tags=["consultations"])


def clean(document: dict) -> dict:
    document.pop("_id", None)
    for key in ("created_at", "updated_at"):
        if isinstance(document.get(key), datetime):
            document[key] = document[key].isoformat()
    return document


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_consultation(
    data: ConsultationCreate,
    background_tasks: BackgroundTasks,
    user: dict | None = Depends(optional_user),
):
    now = datetime.now(timezone.utc)
    document = {
        **data.model_dump(),
        "id": str(uuid.uuid4()),
        "user_id": user["id"] if user else None,
        "status": "new",
        "admin_note": None,
        "created_at": now,
        "updated_at": now,
    }
    await db.consultations.insert_one(document.copy())
    background_tasks.add_task(notify_new_consultation, clean(document.copy()))
    return clean(document)


@router.get("/mine")
async def mine(user: dict = Depends(current_user)):
    items = await db.consultations.find({"user_id": user["id"]}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return [clean(item) for item in items]


@router.get("")
async def list_all(
    status_filter: str | None = Query(default=None, alias="status"),
    search: str | None = None,
    _: dict = Depends(admin_user),
):
    query: dict = {}
    if status_filter and status_filter != "all":
        query["status"] = status_filter
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"email": {"$regex": search, "$options": "i"}},
            {"company": {"$regex": search, "$options": "i"}},
            {"service": {"$regex": search, "$options": "i"}},
        ]
    items = await db.consultations.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [clean(item) for item in items]


@router.patch("/{consultation_id}")
async def update_consultation(
    consultation_id: str,
    data: ConsultationStatusUpdate,
    _: dict = Depends(admin_user),
):
    update = {**data.model_dump(), "updated_at": datetime.now(timezone.utc)}
    result = await db.consultations.update_one({"id": consultation_id}, {"$set": update})
    if not result.matched_count:
        raise HTTPException(status_code=404, detail="الطلب غير موجود")
    item = await db.consultations.find_one({"id": consultation_id}, {"_id": 0})
    return clean(item)
