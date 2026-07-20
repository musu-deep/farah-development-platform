from datetime import datetime, timezone

from fastapi import APIRouter

from ..database import db
from ..schemas import ChatInput
from ..services.ai import generate_reply

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("")
async def chat(data: ChatInput):
    history = await db.chat_messages.find(
        {"session_id": data.session_id}, {"_id": 0}
    ).sort("created_at", 1).to_list(30)
    reply = await generate_reply(data.message, history)
    now = datetime.now(timezone.utc)
    await db.chat_messages.insert_many(
        [
            {"session_id": data.session_id, "role": "user", "content": data.message, "created_at": now},
            {"session_id": data.session_id, "role": "assistant", "content": reply, "created_at": now},
        ]
    )
    return {"reply": reply}
