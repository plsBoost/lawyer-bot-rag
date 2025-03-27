import { NextResponse } from 'next/server';
import { askQuestion } from '@/lib/rag';

export async function POST(req: Request) {
  const { question, persona } = await req.json();

  if (!question) {
    return NextResponse.json({ error: 'Missing question' }, { status: 400 });
  }

  try {
    const answer = await askQuestion(question, persona);
    return NextResponse.json({ answer });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}