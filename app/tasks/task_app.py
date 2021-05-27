import logging
import os
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from dotenv import load_dotenv

load_dotenv()

env = os.environ
logging.basicConfig()
logging.getLogger("apscheduler").setLevel(logging.DEBUG)

scheduler = BackgroundScheduler(
    jobstores={
        "default": SQLAlchemyJobStore(
            url=env.get("SQLALCHEMY_DB_URI"), tablename="jobs"
        )
    },
    timezone="Europe/Paris",
)
