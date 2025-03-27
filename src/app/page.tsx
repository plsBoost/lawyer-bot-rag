'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const presetQuestions = [
  'What does the First Amendment say?',
  'What powers does Congress have?',
  'What is the Fourth Amendment?',
  'What does the Tenth Amendment guarantee?',
  'Can the President declare war?',
  'What is judicial review?',
];


export default function Home() {
  const [input, setInput] = useState('');
  const [persona, setPersona] = useState<'clerk' | 'student' | 'founder'>('clerk');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  // const [darkMode, setDarkMode] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (msg?: string) => {
    const content = msg || input;
    if (!content.trim()) return;

    const userMsg: Message = { sender: 'user', text: content };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);
    setInput('');

    try {
      const res = await fetch('/api/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: content, persona }),
      });


      const data = await res.json();
      const botMsg: Message = { sender: 'bot', text: data.answer || 'No answer found.' };
      setMessages((msgs) => [...msgs, botMsg]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { sender: 'bot', text: '⚠️ Error getting answer.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (

    <main className="">
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h1 className="text-2xl font-bold">⚖️ Law Bot</h1>
        </div>

        <div className="w-full max-w-2xl mx-auto p-4 space-y-2">
          <div className="flex flex-wrap gap-2 mb-4">
            {presetQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-white px-3 py-1 rounded-full text-sm hover:opacity-80 transition"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mb-4 gap-4">
            <span className="text-base font-semibold whitespace-nowrap">
              🧑‍⚖️ Select a Lawyer Persona
            </span>
            <select
              id="persona"
              className="p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-600 text-sm"
              value={persona}
              onChange={(e) => setPersona(e.target.value as 'clerk' | 'student' | 'founder')}
            >
              <option value="clerk">📘 Clerk</option>
              <option value="student">😎 Student</option>
              <option value="founder">🧔 Founder</option>
            </select>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 h-[500px] overflow-y-auto space-y-4 border dark:border-gray-700">
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-wrap ${msg.sender === 'user'
                    ? 'ml-auto bg-blue-500 text-white'
                    : 'mr-auto bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                    }`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <div className="mr-auto bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-3 rounded-2xl max-w-[80%] flex gap-1 animate-pulse">
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:.1s]" />
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:.2s]" />
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:.3s]" />
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <div className="flex gap-2 pt-4">
            <textarea
              className="flex-grow p-3 border rounded resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={2}
              placeholder="Ask a legal question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              onClick={() => sendMessage()}
              className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}