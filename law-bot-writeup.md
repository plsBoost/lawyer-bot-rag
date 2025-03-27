# 📝 Take-Home Write-Up: Law Bot RAG App

## 🔧 Tool Choices

- **Framework**: I chose **Next.js** (with App Router) because it lets me combine the frontend and API backend cleanly, and I'm comfortable with React. It also supports edge deployments if scaled.
- **LangChain.js**: Provides a flexible way to chain together retrieval and OpenAI calls. Their JS ecosystem made it easy to integrate with Next.js.
- **OpenAI**: I used `text-embedding-ada-002` and GPT-3.5 for fast, effective embedding + generation. No need to host models or worry about memory overhead.
- **MemoryVectorStore**: FAISS ran into compatibility issues inside the API route, so I swapped in a memory vector store. This works well for small datasets and demos.

---

## ⚙️ What Worked Well

- Chunking and embedding were smooth using LangChain’s `RecursiveCharacterTextSplitter`
- Switching from PDF to plain text made ingestion much simpler
- The minimal UI made it easy to test and iterate quickly

---

## 🧱 Challenges

- `faiss-node` worked in ingestion but broke inside API routes due to native module loading in Next.js. I solved this by switching to an in-memory store.
- `pdf-parse` caused unexpected file loading bugs — I tried `pdfjs-dist` but ended up switching to a plain `.txt` version of the Constitution to keep things reliable and fast.

---

## ⏭️ If I Had More Time

- I’d deploy this to Vercel and handle persistent vector storage (e.g., with Supabase or Pinecone)
- I’d add source highlighting in the response (like ChatGPT’s "Cited from section X")
- Add streaming chat support for faster feedback and better UX
- Optionally swap in an open-source model (like Mistral or Llama 2) to explore local inference

---

## 🎯 Final Thoughts

This project was a fun and focused way to build a lightweight RAG pipeline end-to-end. It reinforced how fast modern tooling has made LLM app development. With more time, I'd love to extend this into a full legal assistant with a broader corpus and citation-aware output.
