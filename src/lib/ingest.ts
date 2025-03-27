import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from '@langchain/openai';
import { FaissStore } from '@langchain/community/vectorstores/faiss';
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export async function ingestDocs() {
    const rawText = fs.readFileSync('public/constitution.txt', 'utf8');

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