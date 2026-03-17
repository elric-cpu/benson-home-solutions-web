"use client";

import { useState } from 'react';
import { CornerDownRight, MessageCircle, X } from 'lucide-react';

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user' as const, text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
        const response = await fetch('/api/chat/silasVaneChat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: currentInput }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        const botMessage = { role: 'bot' as const, text: result.result };
        setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
        console.error('Error fetching chat response:', error);
        const errorMessage = { role: 'bot' as const, text: 'I am unable to provide a response at this time.' };
        setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={toggleChat}
        className="bg-maroon-800 text-white rounded-full p-4 shadow-lg hover:bg-maroon-700 focus:outline-none focus:ring-2 focus:ring-maroon-600"
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-80 h-96 bg-cream-100 rounded-lg shadow-2xl flex flex-col">
          <header className="bg-maroon-800 text-white p-3 rounded-t-lg">
            <h3 className="font-calibri text-lg font-bold">Benson Home Solutions</h3>
            <p className="font-calibri text-sm">Customer Assistance</p>
          </header>

          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex mb-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`rounded-lg px-3 py-2 max-w-xs ${
                    msg.role === 'user' ? 'bg-maroon-200 text-maroon-900' : 'bg-white'
                  }`}
                >
                  <p className="font-calibri text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="rounded-lg px-3 py-2 max-w-xs bg-white">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-maroon-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-maroon-400 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-maroon-400 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-2 border-t border-cream-300">
            <div className="flex items-center bg-white rounded-lg">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask a question..."
                className="flex-1 p-2 bg-transparent rounded-lg focus:outline-none font-calibri"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                className="p-2 text-maroon-800 hover:text-maroon-600 disabled:text-gray-400"
                disabled={isLoading}
                aria-label="Send message"
              >
                <CornerDownRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
