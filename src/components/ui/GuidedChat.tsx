'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { Card, CardHeader, CardContent } from './Card';
import { BUSINESS } from '@/lib/constants';
import {
  X,
  MessageSquare,
  Phone,
  Calculator,
  Hammer,
  Shield,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type ChatNode = {
  id: string;
  message: string;
  options: {
    label: string;
    nextId?: string;
    link?: string;
    icon?: React.ReactNode;
    primary?: boolean;
  }[];
};

const CHAT_TREE: Record<string, ChatNode> = {
  start: {
    id: 'start',
    message:
      "I'm the Benson Solutions Assistant. How can I help you protect your property today?",
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
    message:
      'Our subscription programs cover everything from gutters to HVAC. Which property type are we looking at?',
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
    message: 'We specialize in high-impact remodels. What are you planning?',
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
      'For immediate emergencies (water damage, fire, structural), call us directly for the fastest response.',
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
    message: 'Get instant estimates with our data-driven tools.',
    options: [
      { label: 'Home Cost Calculator', link: '/tools/cost-calculator' },
      {
        label: 'Subscription Recommender',
        link: '/tools/subscription-recommender',
      },
      { label: 'Remodel Estimator', link: '/tools/cost-estimator' },
      { label: 'Back', nextId: 'start' },
    ],
  },
};

export function GuidedChat({
  autoOpen = false,
  initialNode = 'start',
}: {
  autoOpen?: boolean;
  initialNode?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentNode, setCurrentNode] = useState<ChatNode>(
    CHAT_TREE[initialNode] || CHAT_TREE.start,
  );
  const [history, setHistory] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); // Slight delay for better UX
      return () => clearTimeout(timer);
    }
  }, [autoOpen]);

  const navigateTo = (nextId: string) => {
    if (CHAT_TREE[nextId]) {
      setHistory([...history, currentNode.id]);
      setCurrentNode(CHAT_TREE[nextId]);
    }
  };

  const goBack = () => {
    const prevId = history[history.length - 1];
    if (prevId && CHAT_TREE[prevId]) {
      setHistory(history.slice(0, -1));
      setCurrentNode(CHAT_TREE[prevId]);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentNode]);

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <Card className="border-primary/20 animate-in slide-in-from-bottom-5 mb-4 w-[350px] overflow-hidden shadow-2xl duration-300">
          <CardHeader className="bg-primary text-primary-foreground flex flex-row items-center justify-between space-y-0 p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              <span className="text-sm font-bold tracking-tight uppercase">
                Benson Assistant
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 transition-colors hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </CardHeader>

          <CardContent className="bg-cream/30 flex h-[400px] flex-col p-0">
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto p-4"
            >
              {/* Assistant Message */}
              <div className="border-primary/10 rounded-2xl rounded-tl-none border bg-white p-3 text-sm shadow-sm">
                <p className="text-foreground leading-relaxed">
                  {currentNode.message}
                </p>
              </div>

              {/* Options */}
              <div className="flex flex-col gap-2 pt-2">
                {currentNode.options.map((option, idx) => (
                  <div key={idx} className="w-full">
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
                        onClick={() => navigateTo(option.nextId!)}
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

                {history.length > 0 && (
                  <button
                    onClick={goBack}
                    className="text-muted-foreground hover:text-primary mt-2 flex w-full items-center justify-center gap-1 p-2 text-xs transition-colors"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    <span>Go Back</span>
                  </button>
                )}
              </div>
            </div>

            <div className="border-primary/5 text-muted-foreground border-t bg-white p-3 text-center text-[10px] tracking-widest uppercase">
              Benson Home Solutions • CCB #258533
            </div>
          </CardContent>
        </Card>
      )}

      {/* FAB */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className={cn(
          'h-14 w-14 rounded-full shadow-xl transition-all duration-300',
          isOpen
            ? 'bg-primary hover:bg-primary/90 rotate-90'
            : 'bg-primary hover:bg-primary/90 shadow-primary/20',
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}
