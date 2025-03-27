import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from '@langchain/openai';
import { FaissStore } from '@langchain/community/vectorstores/faiss';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export async function ingestDocs() {
    const res = await fetch('https://law-bot.vercel.app/constitution.txt');
    const rawText = await res.text();

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
    });

    const docs = await splitter.createDocuments([rawText]);

    const vectorStore = await FaissStore.fromDocuments(
        docs,
        new OpenAIEmbeddings()
    );

    await vectorStore.save('faiss_index');
    console.log('✅ FAISS index saved!');
}

if (process.argv[1].includes('ingest.ts')) {
    ingestDocs();
}