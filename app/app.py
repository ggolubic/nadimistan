from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import crochet
import atexit

from routers.auth import auth
from routers.subscriptions import subscriptions
from routers.oglasi import oglasi
from routers.notifications import notifications
from tasks.task_app import asyncscheduler, scraping_scheduler
from tasks.crawling import init_short_index_crawling
from tasks.notifications import send_notifications

app = FastAPI()
app.include_router(auth.router)
app.include_router(subscriptions.router)
app.include_router(oglasi.router)
app.include_router(notifications.router)
crochet.setup()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
    allow_origins=["*"],
)

asyncscheduler.add_job(
    send_notifications,
    trigger="cron",
    hour=12,
    minute=30,
    id="push_notifications",
    replace_existing=True,
)
# scraping_scheduler.add_job(
#     init_short_index_crawling,
#     trigger="interval",
#     minutes=1,
#     id="short_index_crawl",
#     coalesce=True,
#     misfire_grace_time=None,
# )
asyncscheduler.start()
# scraping_scheduler.start()
atexit.register(lambda: asyncscheduler.shutdown())
atexit.register(lambda: scraping_scheduler.shutdown())

# init_short_index_crawling()


@app.get("/ping")
async def pong():
    return {"message": "pong"}
