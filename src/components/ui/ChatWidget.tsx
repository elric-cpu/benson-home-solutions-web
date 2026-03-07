'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { cn } from '@/lib/utils';

interface ChatWidgetProps {
  initialWelcomeMessage?: string;
}
export function ChatWidget({ initialWelcomeMessage }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fallbackGreeting = 
    'Every second you spend looking at this chat is a second your house is getting closer to a condemned sign. Give me the dimensions, the damage, and the deadline. Now.';


  const { messages, sendMessage, status } = useChat({
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [{ type: 'text', text: initialWelcomeMessage || fallbackGreeting }],
      },
    ],
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = input.trim();
    if (!message || isLoading) return;
    
    setInput('');
    // The library expects an object for sendMessage in this version
    await sendMessage({
      parts: [{ type: 'text', text: message }]
    } as any); 
  };

  const getMessageText = (m: any) => {
    if (!m.parts) return '';
    return m.parts
      .map((p: any) => {
        if (p.type === 'text') return p.text || '';
        return '';
      })
      .join('');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  if (!mounted) return null;

  return (
    <div className="fixed right-6 bottom-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-oxblood/10 bg-white shadow-2xl duration-200 sm:w-[400px]">
          {/* Header */}
          <div className="bg-oxblood flex items-center justify-between p-4 text-cream">
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase">Ask Gus</h3>
              <p className="text-[10px] opacity-70 font-medium">Senior Diagnostics Specialist</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Message Area */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-cream/10 p-4">
            {messages.map((m) => (
              <div
                key={m.id}
                data-testid="chat-message"
                className={cn(
                  'flex max-w-[85%] flex-col rounded-2xl p-3 text-sm shadow-sm transition-all',
                  (m.role as string) === 'user'
                    ? 'ml-auto rounded-tr-none bg-oxblood text-cream'
                    : 'mr-auto rounded-tl-none border border-slate/10 bg-white text-charcoal'
                )}
              >
                <div className="whitespace-pre-wrap leading-relaxed">{getMessageText(m)}</div>
              </div>
            ))}
            {isLoading && (
              <div className="mr-auto flex w-12 items-center justify-center space-x-1 rounded-full bg-white p-2 border border-slate/10">
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-oxblood/40" />
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-oxblood/40 [animation-delay:0.2s]" />
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-oxblood/40 [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Footer Input */}
          <form onSubmit={handleSubmit} className="border-t border-slate/10 p-4">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input ?? ''}
                onChange={handleInputChange}
                placeholder="Describe the failure..."
                disabled={isLoading}
                className="flex-1 rounded-lg border border-slate/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-oxblood/50 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !(input ?? '').trim()}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-oxblood text-cream transition-colors hover:bg-oxblood/90 disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        aria-label="Toggle chat"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-oxblood text-cream shadow-xl transition-all hover:scale-105 active:scale-95"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
        )}
      </button>
    </div>
  );
}
