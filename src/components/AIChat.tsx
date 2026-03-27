'use client';

import { Dispatch, SetStateAction, useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Segment } from './plans/PlanBuilder';

// Define a type for the structured tool response
type PlanToolResponse = {
  segment: Segment;
  addonIds: string[];
  summary: string;
};

interface AIChatProps {
  variant?: 'widget' | 'embedded';
  setSegment?: Dispatch<SetStateAction<Segment>>;
  setAddons?: Dispatch<SetStateAction<Set<string>>>;
}

function ChatPanel({ setSegment, setAddons }: AIChatProps) {
  const [messages, setMessages] = useState<
    { role: 'user' | 'model'; content: string }[]
  >([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Chat failed');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Failed to get reader');

      const decoder = new TextDecoder();
      setMessages((prev) => [...prev, { role: 'model', content: '' }]);

      // Handle stream
      let fullResponseText = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullResponseText += chunk;

        // Optimistically update the UI with the streaming text
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1].content = fullResponseText;
          return next;
        });
      }

      // After stream is complete, try to parse for tool response
      try {
        // Genkit may wrap the JSON in ```json ... ```, so we extract it.
        const jsonMatch = fullResponseText.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch && jsonMatch[1]) {
          const toolResponse: PlanToolResponse = JSON.parse(jsonMatch[1]);
          if (
            toolResponse.segment &&
            toolResponse.addonIds &&
            setSegment &&
            setAddons
          ) {
            setSegment(toolResponse.segment);
            setAddons(new Set(toolResponse.addonIds));
            // Update the message to be the user-friendly summary
            setMessages((prev) => {
              const next = [...prev];
              next[next.length - 1].content = toolResponse.summary;
              return next;
            });
          }
        }
      } catch {
        // It wasn't a tool response, so the streamed text is the final message.
        // No extra action needed.
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: 'Gus is temporarily offline. Call 541-321-5115.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-maroon flex h-full w-full flex-col overflow-hidden rounded-2xl border-2 bg-white shadow-2xl">
      <div className="bg-maroon text-cream flex items-center justify-between p-4 font-bold">
        <span>Gus, Plan Specialist</span>
      </div>
      <div
        ref={scrollRef}
        className="bg-cream/10 flex-grow space-y-4 overflow-y-auto p-4 text-sm"
      >
        {messages.length === 0 && (
          <div className="border-maroon/20 rounded-lg border bg-white p-3">
            I can quote exact maintenance plan pricing and help you choose the
            right plan. Is the property residential, commercial, or a church
            facility?
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              'max-w-[85%] rounded-lg p-3',
              m.role === 'user'
                ? 'bg-maroon text-cream ml-auto'
                : 'border-maroon/20 mr-auto border bg-white',
            )}
          >
            {m.content}
          </div>
        ))}
        {isLoading &&
          messages.length > 0 &&
          !messages[messages.length - 1]?.content && (
            <div className="flex justify-center">
              <Loader2 className="text-maroon animate-spin" />
            </div>
          )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="border-maroon/10 flex gap-2 border-t p-4"
      >
        <label htmlFor="ai-chat-input" className="sr-only">
          Message Benson Home Solutions plan assistant
        </label>
        <input
          id="ai-chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Your message..."
          className="border-maroon/20 focus:ring-maroon flex-1 rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          aria-label="Send message"
          className="bg-maroon text-cream rounded-lg p-2 disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}

export function AIChat({
  variant = 'widget',
  setSegment,
  setAddons,
}: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (variant === 'embedded') {
    return <ChatPanel setSegment={setSegment} setAddons={setAddons} />;
  }

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {isOpen ? (
        <div className="h-[600px] w-80 sm:w-96">
          <div className="absolute top-0 right-0 z-10 p-2">
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="bg-maroon text-cream rounded-full p-1"
            >
              <X size={20} />
            </button>
          </div>
          <ChatPanel setSegment={setSegment} setAddons={setAddons} />
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open chat assistant"
          className="bg-maroon text-cream rounded-full p-4 shadow-xl transition hover:scale-105"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
}
