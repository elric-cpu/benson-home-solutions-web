'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ChatWidgetProps {
  initialWelcomeMessage?: string;
}

export function ChatWidget({ initialWelcomeMessage }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Set Gus's fallback greeting
  const fallbackGreeting = "Every second you spend looking at this chat is a second your house is getting closer to a condemned sign. Give me the dimensions, the damage, and the deadline. Now.";

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: initialWelcomeMessage || fallbackGreeting,
      },
    ],
  });

  // Client-side only state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current && isOpen) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  if (!mounted) return null;

  return (
    <div className="fixed right-6 bottom-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <Card className="shadow-elevated border-oxblood/10 mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden bg-white sm:w-[400px]">
          
          {/* Header */}
          <div className="bg-oxblood flex items-center justify-between p-4 text-white">
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase">
                Ask Gus
              </h3>
              <p className="text-[10px] opacity-70">
                Senior Diagnostics Specialist
              </p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="bg-cream/30 flex-1 space-y-4 overflow-y-auto p-4"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  'flex max-w-[85%] flex-col rounded-2xl p-3 text-sm shadow-sm',
                  m.role === 'user'
                    ? 'bg-oxblood ml-auto rounded-tr-none text-white'
                    : 'border-slate/10 text-charcoal mr-auto rounded-tl-none border bg-white',
                )}
              >
                <div className="leading-relaxed whitespace-pre-wrap">
                  {m.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="border-slate/10 text-charcoal mr-auto rounded-2xl rounded-tl-none border bg-white p-3 shadow-sm">
                <div className="flex gap-1 py-1">
                  <div className="bg-oxblood/20 h-1.5 w-1.5 animate-bounce rounded-full" />
                  <div className="bg-oxblood/20 h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:0.2s]" />
                  <div className="bg-oxblood/20 h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-slate/10 border-t bg-white p-4"
          >
            <div className="flex gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Describe the failure..."
                disabled={isLoading}
                className="focus:ring-oxblood/50 border-slate/20 flex-1 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-oxblood hover:bg-oxblood/90 flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </div>
            <p className="text-slate/40 mt-3 text-center text-[9px] font-bold tracking-widest uppercase">
              Logic Core: Gus (Benson Home Solutions)
            </p>
          </form>
        </Card>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="shadow-elevated bg-oxblood group relative flex h-14 w-14 items-center justify-center rounded-full text-white transition-all hover:scale-105 active:scale-95"
        aria-label="Toggle chat"
      >
        {!isOpen && (
          <div className="absolute -top-1 -right-1 flex h-5 w-5 animate-bounce items-center justify-center rounded-full border-2 border-white bg-green-500 text-[10px] font-bold">
            1
          </div>
        )}
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:rotate-12"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
