from fastapi import FastAPI, Query
from openai import OpenAI
import os
from supabase import create_client
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_API_KEY)
client = OpenAI(api_key=OPENAI_API_KEY)



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ask-the-emperor.vercel.app",        
        "http://localhost:5173",
        "http://127.0.0.1:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/ask")
async def ask_question(query: str = Query(..., description="Question to Marcus Aurelius")):
    # embedding  the query
    embedding_response = client.embeddings.create(
        model="text-embedding-ada-002",
        input=query
    )
    query_embedding = embedding_response.data[0].embedding

    # Call Supabase RPC function to find nearest chunk
    result = supabase.rpc(
        "match_marcus_book",
        {
            "query_embedding": query_embedding,
            "match_threshold": 0.5,
            "match_count": 1
        }
    ).execute()



    matched_content = result.data[0]["content"]


    # prepare an answer with openAI
    messages = [
        {
            "role": "system",
            "content": (
                "You are Marcus Aurelius. always answer like an imperor or a king"
                "if they greet you, you do not say how may i assist you because you are an imperor, people assist you"
                "Use the provided context to answer the question briefly and accurately. "
                "If unsure, say 'Sorry, I don't know the answer.' Do not make things up."
                "If the question is for things after 180 AD say sorry I did not live after 180 AD."
            ),
        },
        {
            "role": "user",
            "content": f"Context: {matched_content}\nQuestion: {query}"
        },
    ]

    chat_response = client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        temperature=0.5,
        frequency_penalty=0.5,
    )

    answer = chat_response.choices[0].message.content
    return {"answer": answer}
