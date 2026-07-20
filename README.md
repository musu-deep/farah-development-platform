# منصة فرح التنمية

منصة Full‑Stack عربية RTL لشركة فرح التنمية، تجمع الموقع الاستشاري، إدارة طلبات الاستشارة، بوابة العملاء، لوحة الإدارة، والمساعد الذكي.

## المكونات

- **واجهة تسويقية فاخرة** بهوية بنفسجية مستوحاة من المرجع المرفق.
- **خدمات الشركة**: الاستشارات الإدارية والتطويرية، ريادة الأعمال، بناء القدرات، التأهيل والاعتماد، إعادة الهيكلة، ومراجعة الأداء.
- **حسابات العملاء** وتسجيل الدخول عبر JWT داخل Cookies آمنة.
- **نموذج طلب استشارة** مع متابعة الحالة من لوحة العميل.
- **لوحة إدارة** للإحصاءات، البحث، التصفية، وتحديث حالة الطلب.
- **مساعد فرح الذكي** مع مزود LLM اختياري، ورد احتياطي محلي عند عدم ضبط المفتاح.
- **تنبيهات بريدية اختيارية** عبر SMTP أو Webhook.

## التشغيل السريع عبر Docker

1. انسخ ملفات البيئة:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

2. غيّر `JWT_SECRET` وبيانات المدير داخل `backend/.env`.

3. شغّل:

```bash
docker compose up --build
```

- الواجهة: `http://localhost:8080`
- API: `http://localhost:8000/api`
- توثيق API: `http://localhost:8000/docs`

## التشغيل المحلي

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## الاختبارات

```bash
cd backend && pytest -q
cd frontend && npm run build
```

## الأمان

- لا توجد مفاتيح أو كلمات مرور حقيقية داخل المستودع.
- غيّر جميع القيم الافتراضية قبل النشر.
- المراجع الأصلية احتوت على مفاتيح وصول مكشوفة؛ ينبغي تدويرها من مزوديها وعدم إعادة استخدامها.
