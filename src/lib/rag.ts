import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai';
import { loadQAStuffChain } from 'langchain/chains';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from 'langchain/document';
import fs from 'fs';

export async function askQuestion(question: string): Promise<string> {
  // Load constitution
  const raw = fs.readFileSync('data/constitution.txt', 'utf8');

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  const docs = await splitter.createDocuments([raw]);

  // Embed into memory store
  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings()
  );

  const retriever = vectorStore.asRetriever({ k: 5 });
  const relevantDocs = await retriever.getRelevantDocuments(question);

  console.log(`Found ${relevantDocs.length} relevant docs for "${question}"`);

  const model = new ChatOpenAI({ temperature: 0 });
  const chain = loadQAStuffChain(model);

  const response = await chain.call({
    input_documents: relevantDocs,
    question,
  });

  return response.text;
}
