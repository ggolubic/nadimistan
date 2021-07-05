from sqlalchemy.orm import Session
from . import models, schemas

# should be one at a time, in case of premium user maybe more
def get_subscriptions(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Subscription)
        .filter(models.Subscription.user_id == user_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_user_subscription(
    db: Session, sub: schemas.SubscriptionCreate, user_id: int
):
    db_sub = models.Subscription(**sub.dict(), owner_id=user_id)
    db.add(db_sub)
    db.commit()
    db.refresh(db_sub)
    return db_sub
