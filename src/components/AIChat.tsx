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
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([]);
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
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
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
      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      // Handle stream
      let fullResponseText = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullResponseText += chunk;

        // Optimistically update the UI with the streaming text
        setMessages(prev => {
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
          if (toolResponse.segment && toolResponse.addonIds && setSegment && setAddons) {
            setSegment(toolResponse.segment);
            setAddons(new Set(toolResponse.addonIds));
            // Update the message to be the user-friendly summary
            setMessages(prev => {
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
      setMessages(prev => [...prev, { role: 'model', content: 'Gus is temporarily offline. Call 541-321-5115.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border-2 border-maroon rounded-2xl shadow-2xl w-full flex flex-col overflow-hidden h-full">
       <div className="bg-maroon text-cream p-4 flex justify-between items-center font-bold">
        <span>Gus, Plan Specialist</span>
      </div>
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-cream/10 text-sm">
        {messages.length === 0 && (
          <div className="bg-white p-3 rounded-lg border border-maroon/20">
            I can build you a custom maintenance plan. Is your property residential, commercial, or a church?
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={cn("p-3 rounded-lg max-w-[85%]", m.role === 'user' ? "bg-maroon text-cream ml-auto" : "bg-white border border-maroon/20 mr-auto")}>
            {m.content}
          </div>
        ))}
        {isLoading && messages.length > 0 && !messages[messages.length-1]?.content && (
           <div className="flex justify-center"><Loader2 className="animate-spin text-maroon" /></div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-maroon/10 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Your message..."
          className="flex-1 border border-maroon/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-maroon"
        />
        <button type="submit" disabled={isLoading} className="bg-maroon text-cream p-2 rounded-lg disabled:opacity-50">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}


export function AIChat({ variant = 'widget', setSegment, setAddons }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (variant === 'embedded') {
    return <ChatPanel setSegment={setSegment} setAddons={setAddons} />;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 sm:w-96 h-[600px]">
          <div className="absolute top-0 right-0 p-2 z-10">
              <button onClick={() => setIsOpen(false)} className="bg-maroon text-cream rounded-full p-1">
                <X size={20} />
              </button>
          </div>
          <ChatPanel setSegment={setSegment} setAddons={setAddons} />
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-maroon text-cream p-4 rounded-full shadow-xl hover:scale-105 transition"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
}
