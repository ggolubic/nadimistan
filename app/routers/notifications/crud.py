from bson.objectid import ObjectId
from datetime import datetime

from helpers.mongo import notification_collection, notification_helper
from . import schemas

# fetch last 20 notifications
async def fetch_notifications(user_id: str, page=0, per_page=20) -> dict:
    notifications = []
    async for notification in notification_collection.find({"user_id": user_id}).skip(
        page * per_page
    ).limit(20):
        notifications.append(notification_helper(notification))
    return notifications


# Update a notification with read and read time
async def update_read(notification_id: str) -> bool:

    updated_notification = await notification_collection.update_one(
        {"_id": ObjectId(notification_id)},
        {"$set": {"is_read": True, "read_at": datetime.now()}},
    )
    if updated_notification.modified_count > 0:
        return True
    return False


# add a new notification
async def push_notification(data: schemas.Notification):
    new_notification = await notification_collection.insert_one(data)
    if new_notification:
        return True
    return False
