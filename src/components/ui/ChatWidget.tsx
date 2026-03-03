'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ChatSource {
  title: string;
  url?: string;
}

interface ChatData {
  sources?: ChatSource[];
}

export function ChatWidget({
  initialWelcomeMessage,
}: {
  initialWelcomeMessage?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, data } =
    useChat({
      api: '/api/chat',
      initialMessages: [
        {
          id: 'welcome',
          role: 'assistant',
          content:
            initialWelcomeMessage ||
            "I am Silas Vane, Senior Principal Architect of Logic & Structural Integrity. I have provided this interface for those who have apparently forgotten how to consult a search engine or the 2026 IRC. What is your data-specific inquiry, and how many seconds do you intend to waste?",
        },
      ],
    });

  // Extract sources from data stream
  const getSourcesForMessage = (_messageIndex: number) => {
    if (!data || data.length === 0) return null;
    // For Vercel AI SDK data streaming, find the entry containing sources
    const sourcesData = data.find(
      (d) => d && typeof d === 'object' && (d as ChatData).sources,
    ) as ChatData | undefined;
    return sourcesData ? sourcesData.sources : null;
  };

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <Card className="shadow-elevated mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden border-oxblood/10 bg-white sm:w-[400px]">
          {/* Header */}
          <div className="bg-oxblood flex items-center justify-between p-4 text-white">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest">Ask Silas</h3>
              <p className="text-[10px] opacity-70">Architect of Structural Integrity</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 rounded-full p-1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto bg-cream/30 p-4 space-y-4"
          >
            {messages.length === 0 && (
              <div className="text-slate text-center text-sm py-10 opacity-60 italic">
                Ask me about our maintenance plans, emergency restoration process, or company SOPs.
              </div>
            )}
            {messages.map((m, i) => {
              const sources =
                m.role === 'assistant' ? getSourcesForMessage(i) : null;

              return (
                <div
                  key={m.id}
                  className={cn(
                    'flex flex-col max-w-[85%] rounded-2xl p-3 text-sm shadow-sm',
                    m.role === 'user'
                      ? 'ml-auto bg-oxblood text-white rounded-tr-none'
                      : 'mr-auto bg-white border border-slate/10 text-charcoal rounded-tl-none',
                  )}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {m.content}
                  </div>

                  {sources && sources.length > 0 && (
                    <div className="mt-3 border-t border-slate/5 pt-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate/40 mb-1">
                        Sources
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {sources.slice(0, 3).map((source, si) => (
                          <a
                            key={si}
                            href={
                              source.url ||
                              'https://www.notion.so/Benson-Home-Solutions-Operations-Manual-313265d2478980069a7ad7b0da792c77'
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate/5 hover:bg-oxblood/5 text-[10px] text-oxblood border border-oxblood/10 rounded px-1.5 py-0.5 transition-colors truncate max-w-[120px]"
                            title={source.title}
                          >
                            {source.title || 'Manual'}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {isLoading && (
              <div className="mr-auto bg-white border border-slate/10 text-charcoal rounded-2xl rounded-tl-none p-3 shadow-sm">
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
            className="border-t border-slate/10 bg-white p-4"
          >
            <div className="flex gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Inquire with precision..."
                className="focus:ring-oxblood/50 flex-1 rounded-lg border border-slate/20 px-3 py-2 text-sm focus:outline-none focus:ring-2"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-oxblood hover:bg-oxblood/90 disabled:opacity-50 flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </div>
            <p className="text-slate/40 mt-2 text-center text-[9px] uppercase tracking-widest font-bold">
              Logic Core: Silas Vane (Benson Home Solutions)
            </p>
          </form>
        </Card>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="shadow-elevated hover:scale-105 bg-oxblood flex h-14 w-14 items-center justify-center rounded-full text-white transition-all active:scale-95 group relative"
        aria-label="Toggle chat"
      >
        {!isOpen && (
          <div className="absolute -top-1 -right-1 flex h-5 w-5 animate-bounce items-center justify-center rounded-full bg-green-500 text-[10px] font-bold border-2 border-white">
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
            className="group-hover:rotate-12 transition-transform"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
