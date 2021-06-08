from sqlalchemy import Boolean, Column, ForeignKey, Integer, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.mutable import MutableDict

from helpers.database import Base


# TODO: MAKE NOTIFICATION MODEL WITH READ AND TIME SENT
class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    last_active = Column(DateTime, index=True)
    interval = Column(Integer, nullable=False)
    # https://amercader.net/blog/beware-of-json-fields-in-sqlalchemy/
    config = Column(MutableDict.as_mutable(JSONB))
    disabled = Column(Boolean, default=False)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="subscription")