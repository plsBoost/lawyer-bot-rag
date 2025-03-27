'use client';

import { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');

    try {
      const res = await fetch('/api/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setAnswer(data.answer || 'No answer found.');
    } catch (err) {
      setAnswer('Error fetching answer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">⚖️ Law Bot</h1>

      <textarea
        className="w-full max-w-xl p-3 border rounded mb-4"
        placeholder="Ask me about the Constitution..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        className="px-4 py-2 bg-black text-white rounded"
        onClick={handleAsk}
        disabled={loading}
      >
        {loading ? 'Asking...' : 'Ask'}
      </button>

      {answer && (
        <div className="mt-6 w-full max-w-xl p-4 border rounded bg-gray-100 whitespace-pre-wrap">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </main>
  );
}
