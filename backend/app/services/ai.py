import re

import httpx

from ..config import settings

SYSTEM_PROMPT = """أنت مساعد فرح الذكي لشركة فرح التنمية. أجب بالعربية الفصحى باختصار ووضوح،
وافهم احتياج العميل ثم اقترح الخدمة الأنسب من: الاستشارات الإدارية والتطويرية، ريادة الأعمال،
بناء القدرات والمهارات، التأهيل والاعتماد، إعادة الهيكلة التنظيمية، ومراجعة الأداء.
لا تستخدم تنسيق ماركداون أو رموزاً تعبيرية، ولا تختلق أسعاراً أو وعوداً غير مؤكدة."""

SERVICE_RULES = [
    (("هيكل", "حوكمة", "تنظيم", "صلاحيات"), "إعادة الهيكلة التنظيمية"),
    (("أداء", "مؤشر", "kpi", "قياس", "تقييم"), "مراجعة أداء الشركات والكيانات"),
    (("تدريب", "مهارات", "قيادات", "قدرات"), "بناء القدرات والمهارات"),
    (("اعتماد", "جودة", "iso", "تأهيل"), "التأهيل والاعتماد"),
    (("مشروع", "شركة ناشئة", "استثمار", "نموذج عمل"), "ريادة الأعمال"),
]


def fallback_reply(message: str) -> str:
    normalized = re.sub(r"\s+", " ", message.lower()).strip()
    service = "الاستشارات الإدارية والتطويرية"
    for terms, candidate in SERVICE_RULES:
        if any(term in normalized for term in terms):
            service = candidate
            break
    return (
        f"يبدو أن احتياجكم يندرج ضمن خدمة {service}. "
        "نقترح البدء بجلسة تشخيص قصيرة لتحديد الوضع الحالي والنتائج المطلوبة، "
        "ثم إعداد نطاق عمل واضح ومؤشرات نجاح قابلة للقياس. يمكنكم إرسال طلب الاستشارة من النموذج وسيتواصل الفريق معكم."
    )


async def generate_reply(message: str, history: list[dict]) -> str:
    if settings.ai_provider == "fallback" or not settings.ai_api_key or not settings.ai_base_url:
        return fallback_reply(message)

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages.extend({"role": item["role"], "content": item["content"]} for item in history[-8:])
    messages.append({"role": "user", "content": message})
    headers = {"Authorization": f"Bearer {settings.ai_api_key}", "Content-Type": "application/json"}
    payload = {"model": settings.ai_model, "messages": messages, "temperature": 0.3, "max_tokens": 350}

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(settings.ai_base_url, json=payload, headers=headers)
            response.raise_for_status()
            data = response.json()
        return data["choices"][0]["message"]["content"].strip()
    except Exception:
        return fallback_reply(message)
