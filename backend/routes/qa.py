from fastapi import APIRouter, UploadFile, File, Form
import tempfile
import shutil
from models.embeddings import embed_and_index_chunks, model
from utils.file_parser import extract_text
from utils.chunking import chunk_text
import numpy as np
import os
import google.generativeai as genai
from dotenv import load_dotenv


load_dotenv()

router = APIRouter()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini = genai.GenerativeModel("gemini-2.5-pro")

@router.post("/ask")
async def ask_doc(file: UploadFile = File(...), query: str = Form(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{file.filename.split('.')[-1]}") as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    text = extract_text(tmp_path)
    chunks = chunk_text(text)
    index, _ = embed_and_index_chunks(chunks)

    query_embedding = model.encode([query], convert_to_numpy=True)
    D, I = index.search(query_embedding, k=3)
    retrieved_chunks = [chunks[i] for i in I[0]]
    context = "\n\n".join(retrieved_chunks)

    prompt = f"""
    User Query: {query}

    Relevant Clauses from Document:
    {context}

    Based on the above, return a JSON with:
    - decision (approved/rejected)
    - amount (if applicable)
    - justification with referenced clauses
    """

    response = gemini.generate_content(prompt)
    return {"result": response.text}
