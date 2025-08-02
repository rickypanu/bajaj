from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.qa import router as qa_router
from dotenv import load_dotenv
import os
from core.config import URL

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[URL],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(qa_router, prefix="/api")
