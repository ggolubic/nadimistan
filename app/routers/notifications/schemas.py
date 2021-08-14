from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel


class Notification(BaseModel):
    user_id: str
    subscription_id: str
    listing_ids: List[str]
    created_at: datetime
    read_at: Optional[datetime]
    is_read: bool
