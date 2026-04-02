'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { getOfficeAgentModeLabel, isMultiAgentEnabled, resolveOfficeAgentMode } from '@/lib/office';

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const agentMode = resolveOfficeAgentMode(isMultiAgentEnabled() ? 'multi' : 'single');
  const agentModeLabel = getOfficeAgentModeLabel(agentMode);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages
        .filter(message => message.content.trim().length > 0)
        .map(message => ({
          role: message.role,
          content: [{ text: message.content }],
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history,
          agentMode,
        }),
      });

      if (!response.ok) throw new Error('Chat failed');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let content = '';

      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        content += decoder.decode(value);
        setMessages(prev => {
          const next = [...prev];
          next[next.length - 1].content = content;
          return next;
        });
      }
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          content: 'Chat is unavailable right now. Call 541-602-9694 or use the contact form and we will respond directly.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white border-2 border-maroon rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col overflow-hidden">
          <div className="bg-maroon text-cream p-4 flex justify-between items-center font-bold">
            <div className="flex flex-col">
              <span>Ask Gus (CCB #258533)</span>
              <span className="text-[11px] font-medium text-cream/80">{agentModeLabel}</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          <div ref={scrollRef} className="h-96 overflow-y-auto p-4 space-y-4 bg-cream/10 text-sm">
            {messages.length === 0 && (
              <div className="bg-white p-3 rounded-lg border border-maroon/20">
                {agentMode === 'multi'
                  ? "I'm Gus, fronting the office while the specialist leads sort the answer out. What's broken, and why haven't you fixed it yet?"
                  : "I'm Gus. What's broken, and why haven't you fixed it yet?"}
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`p-3 rounded-lg max-w-[85%] ${m.role === 'user' ? "bg-maroon text-cream ml-auto" : "bg-white border border-maroon/20 mr-auto"}`}>
                {m.content}
              </div>
            ))}
            {isLoading && !messages[messages.length - 1]?.content && (
              <Loader2 className="animate-spin text-maroon mx-auto" />
            )}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-maroon/10 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Describe the failure..."
              className="flex-1 border border-maroon/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-maroon"
            />
            <button type="submit" disabled={isLoading} className="bg-maroon text-cream p-2 rounded-lg disabled:opacity-50">
              <Send size={18} />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open chat assistant"
          className="bg-maroon text-cream p-4 rounded-full shadow-xl hover:scale-105 transition"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
}
