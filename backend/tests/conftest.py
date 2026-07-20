import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
os.environ["ENVIRONMENT"] = "test"
os.environ["USE_MOCK_DB"] = "true"
os.environ["COOKIE_SECURE"] = "false"
os.environ["JWT_SECRET"] = "test-secret-that-is-long-enough"
os.environ["ADMIN_EMAIL"] = "admin@example.com"
os.environ["ADMIN_PASSWORD"] = "AdminPass!2026"
