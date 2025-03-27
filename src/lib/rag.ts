import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai';
import { loadQAStuffChain } from 'langchain/chains';
import fs from 'fs';

export async function askQuestion(question: string, persona?: string): Promise<string> {

    const rawText = fs.readFileSync('public/constitution.txt', 'utf8');

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
    });

    const docs = await splitter.createDocuments([rawText]);

    const vectorStore = await MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings());

    const retriever = vectorStore.asRetriever({ k: 5 });
    const relevantDocs = await retriever.getRelevantDocuments(question);

    const model = new ChatOpenAI({ temperature: 0 });

    const personaInstructions = {
        clerk: "You are a Supreme Court law clerk. Be precise and formal in tone.",
        student: "You are a laid-back but knowledgeable law student. Be casual and helpful.",
        founder: "You are a Founding Father of the United States. Explain the Constitution in old-fashioned, colonial English, using formal and antiquated phrasing.",
    };

    const systemPrompt = personaInstructions[persona as keyof typeof personaInstructions] || '';

    const chain = loadQAStuffChain(model, { prompt: undefined });

    const response = await chain.call({
        input_documents: relevantDocs,
        question: systemPrompt ? `${systemPrompt} ${question}` : question,
    });

    return response.text;
}