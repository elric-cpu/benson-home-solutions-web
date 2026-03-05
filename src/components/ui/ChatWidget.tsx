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
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Gus's signature fallback greeting
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

  // Handle Hydration & Keyboard Shortcuts
  useEffect(() => {
    setMounted(true);
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Auto-scroll & Auto-focus
  useEffect(() => {
    if (isOpen) {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
      // Delay focus slightly to allow the open animation to complete
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
  }, [messages, isOpen]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!mounted) {
    return (
      <div className="fixed right-6 bottom-6 z-[100]">
        <div className="bg-oxblood h-14 w-14 rounded-full opacity-20" />
      </div>
    );
  }

  return (
    <div className="fixed right-6 bottom-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <Card className="shadow-elevated border-oxblood/10 mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden bg-white sm:w-[400px] animate-in slide-in-from-bottom-2 duration-200">
          
          {/* Header */}
          <div className="bg-oxblood flex items-center justify-between p-4 text-white">
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase">Ask Gus</h3>
              <p className="text-[10px] opacity-70">Senior Diagnostics Specialist</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="bg-cream/30 flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  'group relative flex max-w-[85%] flex-col rounded-2xl p-3 text-sm shadow-sm transition-all',
                  m.role === 'user'
                    ? 'bg-oxblood ml-auto rounded-tr-none text-white'
                    : 'border-slate/10 text-charcoal mr-auto rounded-tl-none border bg-white',
                )}
              >
                <div className="leading-relaxed whitespace-pre-wrap">{m.content}</div>
                
                {/* Copy Button (Hover-only) */}
                {m.role === 'assistant' && m.id !== 'welcome' && (
                  <button
                    onClick={() => copyToClipboard(m.content)}
                    className="absolute -right-8 top-0 p-1 text-slate/30 opacity-0 transition-opacity hover:text-oxblood group-hover:opacity-100"
                    title="Copy Report"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
                  </button>
                )}
              </div>
            ))}
            
            {/* Loading Skeleton: Diagnostic Report Style */}
            {isLoading && (
              <div className="mr-auto flex max-w-[85%] w-full flex-col space-y-2 rounded-2xl rounded-tl-none border border-slate/10 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-oxblood/40" />
                  <div className="h-2 w-24 animate-pulse rounded-md bg-slate/10" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full animate-pulse rounded-md bg-slate/5" />
                  <div className="h-3 w-[90%] animate-pulse rounded-md bg-slate/5 [animation-delay:0.2s]" />
                  <div className="h-3 w-[75%] animate-pulse rounded-md bg-slate/5 [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="border-slate/10 border-t bg-white p-4">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input ?? ''}
                onChange={handleInputChange}
                placeholder="Describe the failure..."
                disabled={isLoading}
                className="focus:ring-oxblood/50 border-slate/20 flex-1 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input?.trim()}
                className="bg-oxblood hover:bg-oxblood/90 flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-12"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
        )}
      </button>
    </div>
  );
}