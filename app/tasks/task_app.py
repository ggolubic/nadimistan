import logging
import os
from apscheduler.schedulers.twisted import TwistedScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from config import config

logging.basicConfig()
logging.getLogger("apscheduler").setLevel(logging.DEBUG)

scheduler = TwistedScheduler(
    jobstores={
        "default": SQLAlchemyJobStore(
            url=config.SQLALCHEMY_DATABASE_URL, tablename="jobs"
        )
    },
    timezone="Europe/Paris",
)
