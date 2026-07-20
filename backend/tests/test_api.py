from fastapi.testclient import TestClient

from app.main import app


def test_full_consultation_flow():
    with TestClient(app) as client:
        health = client.get("/health")
        assert health.status_code == 200

        register = client.post(
            "/api/auth/register",
            json={
                "name": "عميل تجريبي",
                "email": "client@example.com",
                "password": "ClientPass!2026",
                "company": "شركة الاختبار",
                "phone": "+966500000000",
            },
        )
        assert register.status_code == 201
        assert register.json()["role"] == "client"

        consultation = client.post(
            "/api/consultations",
            json={
                "name": "عميل تجريبي",
                "email": "client@example.com",
                "company": "شركة الاختبار",
                "phone": "+966500000000",
                "service": "إعادة الهيكلة التنظيمية",
                "message": "نحتاج إلى إعادة بناء الهيكل التنظيمي وتحديد الصلاحيات بوضوح.",
                "urgency": "high",
            },
        )
        assert consultation.status_code == 201
        consultation_id = consultation.json()["id"]

        mine = client.get("/api/consultations/mine")
        assert mine.status_code == 200
        assert mine.json()[0]["id"] == consultation_id

        client.post("/api/auth/logout")
        admin_login = client.post(
            "/api/auth/login",
            json={"email": "admin@example.com", "password": "AdminPass!2026"},
        )
        assert admin_login.status_code == 200
        assert admin_login.json()["role"] == "admin"

        stats = client.get("/api/admin/stats")
        assert stats.status_code == 200
        assert stats.json()["new"] == 1

        updated = client.patch(
            f"/api/consultations/{consultation_id}",
            json={"status": "in_progress", "admin_note": "تم تعيين مستشار للمشروع"},
        )
        assert updated.status_code == 200
        assert updated.json()["status"] == "in_progress"


def test_chat_fallback():
    with TestClient(app) as client:
        response = client.post(
            "/api/chat",
            json={"session_id": "test-session", "message": "نحتاج إلى تدريب القيادات وبناء القدرات"},
        )
        assert response.status_code == 200
        assert "بناء القدرات" in response.json()["reply"]
