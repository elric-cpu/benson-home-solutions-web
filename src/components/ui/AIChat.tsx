'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calculator,
  Hammer,
  Loader2,
  MessageSquare,
  Phone,
  Send,
  Shield,
  X,
} from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Card, CardContent, CardHeader } from './Card';

type ChatOption = {
  label: string;
  nextId?: string;
  link?: string;
  icon?: React.ReactNode;
  primary?: boolean;
};

type ChatNode = {
  id: string;
  message: string;
  options: ChatOption[];
};

type Message = {
  role: 'user' | 'model';
  content: string;
};

const CHAT_TREE: Record<string, ChatNode> = {
  start: {
    id: 'start',
    message:
      "I'm Gus, your Benson assistant. How can I help with your property today?",
    options: [
      {
        label: 'Maintenance Plans',
        nextId: 'maintenance',
        icon: <Shield className="h-4 w-4" />,
      },
      {
        label: 'Remodeling',
        nextId: 'remodeling',
        icon: <Hammer className="h-4 w-4" />,
      },
      {
        label: 'Emergency Service',
        nextId: 'emergency',
        icon: <Phone className="h-4 w-4" />,
        primary: true,
      },
      {
        label: 'Cost Calculators',
        nextId: 'tools',
        icon: <Calculator className="h-4 w-4" />,
      },
      {
        label: 'Talk to a Human',
        link: '/contact',
        icon: <MessageSquare className="h-4 w-4" />,
      },
    ],
  },
  maintenance: {
    id: 'maintenance',
    message: 'Which property type should we focus on?',
    options: [
      { label: 'Residential', link: '/services/maintenance-subscriptions' },
      { label: 'Commercial', link: '/services/commercial' },
      {
        label: 'Church/Community',
        link: '/services/maintenance-subscriptions',
      },
      { label: 'Back', nextId: 'start' },
    ],
  },
  remodeling: {
    id: 'remodeling',
    message: 'What kind of remodel are you planning?',
    options: [
      { label: 'Kitchen', link: '/services/kitchen-remodeling' },
      { label: 'Bathroom', link: '/services/bathroom-remodeling' },
      { label: 'Other/Full Remodel', link: '/services/remodeling' },
      { label: 'Back', nextId: 'start' },
    ],
  },
  emergency: {
    id: 'emergency',
    message:
      'For immediate emergencies (water, fire, structural), call us directly for fastest response.',
    options: [
      {
        label: `Call ${BUSINESS.phone}`,
        link: `tel:${BUSINESS.phone.replace(/\D/g, '')}`,
        primary: true,
      },
      { label: 'View Emergency Services', link: '/emergency' },
      { label: 'Back', nextId: 'start' },
    ],
  },
  tools: {
    id: 'tools',
    message: 'Choose a tool or ask Gus a custom question.',
    options: [
      {
        label: 'Property Health Audit',
        nextId: 'audit_input',
        icon: <Shield className="h-4 w-4" />,
      },
      { label: 'Home Cost Calculator', link: '/tools/cost-calculator' },
      { label: 'Remodel Estimator', link: '/tools/cost-estimator' },
      { label: 'Back', nextId: 'start' },
    ],
  },
  audit_input: {
    id: 'audit_input',
    message:
      'Describe your property condition (roof, HVAC, moisture, wear). I will generate a quick audit.',
    options: [{ label: 'Back', nextId: 'tools' }],
  },
};

export function AIChat({
  autoOpen = false,
  initialNode = 'start',
}: {
  autoOpen?: boolean;
  initialNode?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'guided' | 'ai'>('guided');
  const [currentNode, setCurrentNode] = useState<ChatNode>(
    CHAT_TREE[initialNode] || CHAT_TREE.start,
  );
  const [history, setHistory] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoOpen) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [autoOpen]);

  const navigateTo = (nextId: string) => {
    if (!CHAT_TREE[nextId]) return;
    setHistory((prev) => [...prev, currentNode.id]);
    setCurrentNode(CHAT_TREE[nextId]);
    setMode('guided');
  };

  const goBack = () => {
    const prevId = history[history.length - 1];
    if (!prevId || !CHAT_TREE[prevId]) return;
    setHistory((prev) => prev.slice(0, -1));
    setCurrentNode(CHAT_TREE[prevId]);
    setMode('guided');
  };

  const handleSubmit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    const userMessage = inputValue.trim();

    if (!userMessage || isLoading) return;

    const endpoint =
      currentNode.id === 'audit_input' ? '/api/ai/audit' : '/api/chat';
    const body =
      currentNode.id === 'audit_input'
        ? { description: userMessage }
        : { message: userMessage, history: messages };

    setMode('ai');
    setInputValue('');
    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: userMessage },
      { role: 'model', content: 'Thinking.' },
    ]);

    const setLastAssistantMessage = (content: string) => {
      setMessages((prev) => {
        if (prev.length === 0) return prev;
        const next = [...prev];
        next[next.length - 1] = { role: 'model', content };
        return next;
      });
    };

    let loadingDots = '.';
    const loadingTimer = window.setInterval(() => {
      loadingDots = loadingDots.length >= 3 ? '.' : `${loadingDots}.`;
      setLastAssistantMessage(`Thinking${loadingDots}`);
    }, 1000);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Unable to complete request');
      }

      if (response.body && endpoint === '/api/chat') {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantContent = '';
        let hasClearedLoading = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (!hasClearedLoading) {
            window.clearInterval(loadingTimer);
            hasClearedLoading = true;
          }
          assistantContent += decoder.decode(value);
          setLastAssistantMessage(assistantContent);
        }

        if (!assistantContent) {
          setLastAssistantMessage('No response from AI.');
        }
      } else {
        const data = (await response.json()) as { response?: string };
        setLastAssistantMessage(data.response || 'No response from AI.');
      }
    } catch {
      setLastAssistantMessage(
        'Network issue detected. Please try again or contact us directly.',
      );
    } finally {
      window.clearInterval(loadingTimer);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mode, currentNode, messages, isLoading]);

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end">
      {isOpen && (
        <Card className="border-primary/20 animate-in slide-in-from-bottom-5 mb-4 w-[350px] overflow-hidden shadow-2xl duration-300">
          <CardHeader className="bg-primary text-primary-foreground font-calibri flex flex-row items-center justify-between space-y-0 p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              <span
                data-testid="chat-message"
                className="text-sm font-bold tracking-tight uppercase"
              >
                Ask Gus
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 transition-colors hover:bg-white/10"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </CardHeader>

          <CardContent className="bg-cream/30 font-calibri flex h-[450px] flex-col p-0">
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto p-4"
            >
              <div
                data-testid="chat-message"
                className="border-primary/10 rounded-2xl rounded-tl-none border bg-white p-3 text-sm shadow-sm"
              >
                <p className="text-foreground leading-relaxed">
                  {CHAT_TREE.start.message}
                </p>
              </div>

              {mode === 'guided' ? (
                <>
                  {currentNode.id !== 'start' && (
                    <div className="border-primary/10 rounded-2xl rounded-tl-none border bg-white p-3 text-sm shadow-sm">
                      <p className="text-foreground leading-relaxed">
                        {currentNode.message}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col gap-2 pt-2">
                    {currentNode.options.map((option, index) => (
                      <div
                        key={`${currentNode.id}-${index}`}
                        className="w-full"
                      >
                        {option.link ? (
                          <Link
                            href={option.link}
                            className={cn(
                              'flex w-full items-center gap-2 rounded-xl border p-3 text-sm transition-all',
                              option.primary
                                ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                                : 'text-foreground border-primary/10 hover:border-primary/30 hover:bg-primary/5 bg-white',
                            )}
                          >
                            {option.icon}
                            <span className="font-medium">{option.label}</span>
                          </Link>
                        ) : (
                          <button
                            onClick={() =>
                              option.nextId && navigateTo(option.nextId)
                            }
                            className={cn(
                              'flex w-full items-center gap-2 rounded-xl border p-3 text-sm transition-all',
                              option.primary
                                ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                                : 'text-foreground border-primary/10 hover:border-primary/30 hover:bg-primary/5 bg-white',
                            )}
                          >
                            {option.icon}
                            <span className="font-medium">{option.label}</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  {messages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      data-testid="chat-message"
                      className={cn(
                        'rounded-2xl border p-3 text-sm shadow-sm',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground border-primary/40 ml-8 rounded-tr-none'
                          : 'border-primary/10 mr-8 rounded-tl-none bg-white',
                      )}
                    >
                      <p className="leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-primary/5 border-t bg-white p-3">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Describe the failure..."
                  className="border-primary/20 focus:ring-maroon/30 flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
                  aria-label="Message input"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!inputValue.trim() || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>

              <div className="mt-2 flex items-center justify-between text-[10px] tracking-widest uppercase">
                <button
                  onClick={() => {
                    setMode('guided');
                    setMessages([]);
                  }}
                  className="text-muted-foreground hover:text-primary inline-flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Guided menu
                </button>
                <span className="text-muted-foreground">
                  Benson Home Solutions
                </span>
              </div>

              {history.length > 0 && mode === 'guided' && (
                <button
                  onClick={goBack}
                  className="text-muted-foreground hover:text-primary mt-2 inline-flex items-center gap-1 text-xs transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Go Back
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        size="lg"
        aria-label="Toggle chat"
        className={cn(
          'h-14 w-14 rounded-full shadow-xl transition-all duration-300',
          isOpen
            ? 'bg-primary hover:bg-primary/90 rotate-90'
            : 'bg-primary hover:bg-primary/90 shadow-primary/20',
        )}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </div>
  );
}
