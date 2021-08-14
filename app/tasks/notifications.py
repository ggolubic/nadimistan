from datetime import datetime

from routers.subscriptions import crud as sub_crud
from routers.oglasi import crud as oglasi_crud
from routers.notifications import crud as notification_crud
from routers.notifications import schemas
from helpers.database import get_db
from helpers.email import send_listings_email


def get_ids(listings):
    return list(map((lambda x: x.get("id")), listings))


def create_notification(listings, subscription) -> schemas.Notification:
    notification = {}
    notification["user_id"] = subscription.get("user_id")
    notification["subscription_id"] = subscription.get("id")
    notification["listing_ids"] = get_ids(listings)
    notification["created_at"] = datetime.now()
    notification["read_at"] = None
    notification["is_read"] = False

    return notification


async def send_notifications():
    db = next(get_db())
    subs = sub_crud.get_all_active_subscriptions(db=db)
    for sub in subs:
        sub_dict = sub.columns_to_dict()
        config = sub_dict.get("config")
        oglasi = await oglasi_crud.fetch_oglasi(**config)
        if oglasi and len(oglasi) > 0:
            notification = create_notification(oglasi, sub_dict)
            await notification_crud.push_notification(notification)
            send_listings_email(oglasi)
