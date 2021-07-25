from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from datetime import datetime
from . import models, schemas

# should be one at a time, in case of premium user maybe more
def get_subscriptions(
    db: Session, user_id: int, skip: int = 0, limit: int = 100, disabled=False
):
    return (
        db.query(models.Subscription)
        .filter(
            and_(
                models.Subscription.user_id == user_id,
                models.Subscription.disabled == disabled,
            )
        )
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_user_subscription(
    db: Session, sub: schemas.SubscriptionCreate, user_id: int
):

    db_sub = models.Subscription(
        **sub.dict(), user_id=user_id, last_active=datetime.now()
    )
    db.add(db_sub)
    db.commit()
    db.refresh(db_sub)
    return db_sub


def remove_user_subscription(db: Session, sub_id: int, user_id: int):
    db.query(models.Subscription).filter(
        and_(models.Subscription.id == sub_id, models.Subscription.user_id == user_id)
    ).update({"disabled": True})
    db.commit()
