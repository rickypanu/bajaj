from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.qa import router as qa_router
from dotenv import load_dotenv
import os

load_dotenv()

# Fallback if URL not found
URL = os.getenv("URL", "*")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[URL],  # Use "*" for dev or set to specific domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(qa_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "FastAPI backend is live on Hugging Face!"}
