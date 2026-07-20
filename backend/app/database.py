from motor.motor_asyncio import AsyncIOMotorClient

from .config import settings

if settings.use_mock_db or settings.environment == "test":
    from mongomock_motor import AsyncMongoMockClient

    client = AsyncMongoMockClient()
else:
    client = AsyncIOMotorClient(settings.mongo_url, serverSelectionTimeoutMS=4000)

db = client[settings.db_name]


async def prepare_database() -> None:
    await db.users.create_index("email", unique=True)
    await db.consultations.create_index("id", unique=True)
    await db.consultations.create_index([("created_at", -1)])
    await db.chat_messages.create_index([("session_id", 1), ("created_at", 1)])


async def close_database() -> None:
    client.close()
