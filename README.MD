```markdown
# ⚖️ Law Bot — A Retrieval-Augmented Generation (RAG) App

A simple RAG (Retrieval-Augmented Generation) web app that answers questions about the U.S. Constitution using a custom dataset, embeddings, and a local vector store.

Built with:
- 🧠 LangChain.js
- 💬 OpenAI API
- 🧱 Next.js + React + Tailwind CSS

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
| Vector DB   | In-memory vector store (MemoryVectorS`on in plain text, retrieved from [Project Gutenberg](https://www.gutenberg.org/ebooks/5).  
It’s pr1. Load and split the text into semantic chunks
2. Generate embeddings using OpenAI
3. Store them in memory via LangChain's `MemoryVectorStore`
4. On FAISS or Pinecone for persistent vector storage
- Add streaming / token-based generation
- Show sources / references per answer
- Deploy via Vercel orowers does Congress have?"
- "What is the Fourth A.js** (with App Router) because it lets me combine the frontend and API backend cleanly, and I'm comfortable with React. It also supports edge deployments if scaled.
- **LangChain.js**: Provides a flexible way to chain together retrieval and OpenAI calls. Their JS ecosystem made it easy to integrate with Next.js.
- **OpenAI**: I used `text-embedding-ada-002` and GPT-3.5 for fast, effective embedding + generation. No need to host models or worry about memory overhead.
- **MemoryVectorStore**: FAI️smooth using LangChain’s `RecursiveCharacterTextSplitter`
- Switching from PDF to plain text made ingestion much simpler
- The minimal UI made it easyside API routes due to native module loading in Next.js. I solved this by switching to an in-memory store.
- `pdf-parse` caused unexpected file loadindle persistent vector storage (e.g., with Supabase or Pinecone)
- I’d add source highlighting in the response (like ChatGPT’s "Cited from section X")
- Add streaming chat support for faster feedback and better UX
- Optionally swap in an open-source mas a fun and focused way to build a lightweight RAG pipeline end-to-end. It reinforced how fast modern tooling has made LLM app development. With more time, I'd love to extend this into a full legal assistant with a broader corpus and citation-aware odel (like Mistral or Llama 2) to explore local inference
                                 output.
```                                
---

## 🎯 Final Thoughts

This project wHad More Time

- I’d deploy this to Vercel and hang bugs — I tried `pdfjs-dist` but ended up switching to a plain `.txt` version of the Constitution to keep things reliable and fast.

---

## ⏭️ If I s

- `faiss-node` worked in ingestion but broke in to test and iterate quickly

---

## 🧱 Challenge What Worked Well

- Chunking and embedding were SS ran into compatibility issues inside the API route, so I swapped in a memory vector store. This works well for small datasets and demos.

---

## ⚙# 🔧 Tool Choices

- **Framework**: I chose **Next--

# 📝 Write-Up (Submission Text)

```markdown
#] as part of a RAG app take-home challenge.
```

-mendment?"

---

## ✍️ Author

Built by [Your Name

- "What does the First Amendment say?"
- "What p Docker

---

## 🧑‍⚖️ Demo Questions

Try asking:question: retrieve similar chunks and use LLM to answer

---

## 🛠️ Future Improvements

- Swap in eprocessed into ~500-character overlapping chunks and embedded via OpenAI.

---

## 📚 How It Works

# 📄 Data

The dataset is the full U.S. Constitutip://localhost:3000](http://localhost:3000)

---

# Run the app

```bash
npm run dev
```

Visit: [htt``env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
```

###
npm install
```

### Add your `.env.local` file

t//github.com/your-username/law-bot.git
cd law-bot
ore) |

---

## 📦 Setup

```bash
git clone https:
