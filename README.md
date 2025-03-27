# ⚖️ Law Bot — A Retrieval-Augmented Generation (RAG) App

A simple RAG (Retrieval-Augmented Generation) web app that answers questions about the U.S. Constitution using a custom dataset, embeddings, and a local vector store.

Built with:
- 🧠 LangChain.js
- 💬 OpenAI API
- 🧱 Next.js + React + Tailwind CSS

---

## ✅ Live Demo

🔗 [https://law-bot.vercel.app](https://lawyer-bot-rag.vercel.app/)

Ask legal questions with style — powered by RAG and OpenAI's LLM.

---

## 🚀 Features

- Ask questions about the Constitution
- Retrieves relevant chunks using vector similarity
- Uses OpenAI to generate a response with context
- Lightweight chat UI built with React and Tailwind
- Fully local (no hosted DB or backend needed)

---

## 🧰 Stack

| Layer       | Tech Used                     |
|-------------|-------------------------------|
| Frontend    | React (Next.js App Router)    |
| Styling     | Tailwind CSS                  |
| Backend API | Next.js API route             |
| Embedding   | OpenAI `text-embedding-ada-002` |
| LLM         | OpenAI GPT-3.5 via LangChain  |
| Vector DB   | In-memory vector store (MemoryVectorStore) |

---

## 📦 Setup

```bash
git clone https://github.com/your-username/law-bot.git
cd law-bot

npm install
```

### Add your `.env.local` file

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
```

### Run the app

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📄 Data

The dataset is the full U.S. Constitution in plain text, retrieved from [Project Gutenberg](https://www.gutenberg.org/ebooks/5).  
It’s preprocessed into ~500-character overlapping chunks and embedded via OpenAI.

---

## 📚 How It Works

1. Load and split the text into semantic chunks
2. Generate embeddings using OpenAI
3. Store them in memory via LangChain's `MemoryVectorStore`
4. On question: retrieve similar chunks and use LLM to answer

---

## 🛠️ Future Improvements

- Swap in FAISS or Pinecone for persistent vector storage
- Add streaming / token-based generation
- Show sources / references per answer
- Deploy via Vercel or Docker

---

## 🧑‍⚖️ Demo Questions

Try asking:

- "What does the First Amendment say?"
- "What powers does Congress have?"
- "What is the Fourth Amendment?"

---

## 📄 Project Write-Up

For a detailed write-up on tool choices, challenges, and potential improvements, see:

👉 [law-bot-writeup.md](./law-bot-writeup.md)
