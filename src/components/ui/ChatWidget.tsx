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
            'I am Silas Vane, Senior Principal Architect of Logic & Structural Integrity. I have provided this interface for those who have apparently forgotten how to consult a search engine or the 2026 IRC. What is your data-specific inquiry, and how many seconds do you intend to waste?',
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
    <div className="fixed right-6 bottom-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <Card className="shadow-elevated border-oxblood/10 mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden bg-white sm:w-[400px]">
          // Update the Header block:
          <div className="bg-oxblood flex items-center justify-between p-4 text-white">
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase">
                Ask Gus
              </h3>
              <p className="text-[10px] opacity-70">
                Senior Diagnostics Specialist
              </p>
            </div>
            {/* ... rest of header ... */}
          </div>
          // Update the footer text block below the form:
          <p className="text-slate/40 mt-2 text-center text-[9px] font-bold tracking-widest uppercase">
            Logic Core: Gus (Benson Home Solutions)
          </p>
          {/* Messages */}
          <div
            ref={scrollRef}
            className="bg-cream/30 flex-1 space-y-4 overflow-y-auto p-4"
          >
            {messages.length === 0 && (
              <div className="text-slate py-10 text-center text-sm italic opacity-60">
                Ask me about our maintenance plans, emergency restoration
                process, or company SOPs.
              </div>
            )}
            {messages.map((m, i) => {
              const sources =
                m.role === 'assistant' ? getSourcesForMessage(i) : null;

              return (
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

                  {sources && sources.length > 0 && (
                    <div className="border-slate/5 mt-3 border-t pt-2">
                      <p className="text-slate/40 mb-1 text-[10px] font-bold tracking-wider uppercase">
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
                            className="bg-slate/5 hover:bg-oxblood/5 text-oxblood border-oxblood/10 max-w-[120px] truncate rounded border px-1.5 py-0.5 text-[10px] transition-colors"
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
                placeholder="Inquire with precision..."
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
            <p className="text-slate/40 mt-2 text-center text-[9px] font-bold tracking-widest uppercase">
              Logic Core: Silas Vane (Benson Home Solutions)
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
