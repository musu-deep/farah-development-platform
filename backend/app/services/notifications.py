import logging

import httpx

from ..config import settings

logger = logging.getLogger(__name__)


async def notify_new_consultation(item: dict) -> None:
    if not settings.email_webhook_url or not settings.notification_email:
        return

    payload = {
        "to": settings.notification_email,
        "subject": f"طلب استشارة جديد — {item['name']}",
        "text": (
            f"الاسم: {item['name']}\n"
            f"البريد: {item['email']}\n"
            f"الجهة: {item.get('company') or '-'}\n"
            f"الخدمة: {item['service']}\n\n"
            f"{item['message']}"
        ),
    }
    headers = {"Authorization": f"Bearer {settings.email_webhook_key}"} if settings.email_webhook_key else {}
    try:
        async with httpx.AsyncClient(timeout=15) as client:
            response = await client.post(settings.email_webhook_url, json=payload, headers=headers)
            response.raise_for_status()
    except Exception as exc:  # notification failure must not block the request
        logger.warning("Email notification failed: %s", exc)
