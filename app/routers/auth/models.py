from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from helpers.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(80), unique=True, index=True)
    full_name = Column(String(80), nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(
        Boolean,
        default=True,
    )

    subscription = relationship("Subscription", back_populates="user")
