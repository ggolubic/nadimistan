import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    DB_USER = os.getenv("DB_USER")
    DB_USER_PWD = os.getenv("DB_USER_PWD")
    DB_HOST = os.getenv("DB_HOST")
    SQLALCHEMY_DATABASE_URL = os.getenv("SQLALCHEMY_DB_URI")
    SERVICE_EMAIL = os.getenv("SERVICE_EMAIL")
    EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
    TESTING_RECEIVER_EMAIL = os.getenv("TESTING_RECEIVER_EMAIL")
    SECRET_KEY = os.getenv("SECRET_KEY")
    HASHING_ALGORITHM = os.getenv("HASHING_ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")


config = Config()