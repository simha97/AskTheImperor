# Ask the Emperor – A Marcus Aurelius Q&A Bot
Ever wanted to ask a Roman emperor for wisdom? This project brings Marcus Aurelius to the digital age. Ask one question at a time and receive a reply inspired by his own words from Meditations — as if the Stoic emperor himself were answering you.
Visit the website: https://ask-the-emperor.vercel.app/
 It is not a conversation/chatbot. This app delivers a single response per question based on actual text from Meditations.

## How It Works
User asks a question.

The backend embeds the question and finds the most relevant passage from Meditations stored in Supabase.

The system prompts GPT-4 to respond as Marcus Aurelius, using the matched content as context.

The emperor answers.

## Features
- Ask questions inspired by Meditations

- Responses are styled like a Roman emperor speaking

- Grounded in real passages (no made-up wisdom)

- Will reject questions about events after 180 AD

- No misleading chat — just one question at a time

## Tech Stack
### Frontend
- React with Tailwind CSS

- Clean UI with focus on a single-question experience

### Backend
- FastAPI (Python)

- OpenAI API (GPT-4) for regal responses

- Supabase for storing and retrieving embedded text chunks

- Cloud vector search via Supabase RPC
