'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { Card, CardHeader, CardContent } from './Card';
import { BUSINESS } from '@/lib/constants';
import { X, MessageSquare, Phone, Calculator, Hammer, Shield, ArrowLeft } from 'lucide-react';
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
    message: "I'm the Benson Solutions Assistant. How can I help you protect your property today?",
    options: [
      { label: 'Maintenance Plans', nextId: 'maintenance', icon: <Shield className="w-4 h-4" /> },
      { label: 'Remodeling', nextId: 'remodeling', icon: <Hammer className="w-4 h-4" /> },
      { label: 'Emergency Service', nextId: 'emergency', icon: <Phone className="w-4 h-4" />, primary: true },
      { label: 'Cost Calculators', nextId: 'tools', icon: <Calculator className="w-4 h-4" /> },
      { label: 'Talk to a Human', link: '/contact', icon: <MessageSquare className="w-4 h-4" /> },
    ],
  },
  maintenance: {
    id: 'maintenance',
    message: "Our subscription programs cover everything from gutters to HVAC. Which property type are we looking at?",
    options: [
      { label: 'Residential', link: '/services/maintenance-subscriptions' },
      { label: 'Commercial', link: '/services/commercial' },
      { label: 'Church/Community', link: '/services/maintenance-subscriptions' },
      { label: 'Back', nextId: 'start' },
    ],
  },
  remodeling: {
    id: 'remodeling',
    message: "We specialize in high-impact remodels. What are you planning?",
    options: [
      { label: 'Kitchen', link: '/services/kitchen-remodeling' },
      { label: 'Bathroom', link: '/services/bathroom-remodeling' },
      { label: 'Other/Full Remodel', link: '/services/remodeling' },
      { label: 'Back', nextId: 'start' },
    ],
  },
  emergency: {
    id: 'emergency',
    message: "For immediate emergencies (water damage, fire, structural), call us directly for the fastest response.",
    options: [
      { label: `Call ${BUSINESS.phone}`, link: `tel:${BUSINESS.phone.replace(/\D/g, '')}`, primary: true },
      { label: 'View Emergency Services', link: '/emergency' },
      { label: 'Back', nextId: 'start' },
    ],
  },
  tools: {
    id: 'tools',
    message: "Get instant estimates with our data-driven tools.",
    options: [
      { label: 'Home Cost Calculator', link: '/tools/cost-calculator' },
      { label: 'Subscription Recommender', link: '/tools/subscription-recommender' },
      { label: 'Remodel Estimator', link: '/tools/cost-estimator' },
      { label: 'Back', nextId: 'start' },
    ],
  },
};

export function GuidedChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentNode, setCurrentNode] = useState<ChatNode>(CHAT_TREE.start);
  const [history, setHistory] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <Card className="mb-4 w-[350px] shadow-2xl border-primary/20 animate-in slide-in-from-bottom-5 duration-300 overflow-hidden">
          <CardHeader className="bg-primary text-primary-foreground p-4 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-bold text-sm tracking-tight uppercase">Benson Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 p-1 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-[400px] bg-cream/30">
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {/* Assistant Message */}
              <div className="bg-white border border-primary/10 rounded-2xl rounded-tl-none p-3 text-sm shadow-sm">
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
                          "flex items-center gap-2 w-full p-3 rounded-xl text-sm transition-all border",
                          option.primary 
                            ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90" 
                            : "bg-white text-foreground border-primary/10 hover:border-primary/30 hover:bg-primary/5"
                        )}
                      >
                        {option.icon}
                        <span className="font-medium">{option.label}</span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => navigateTo(option.nextId!)}
                        className={cn(
                          "flex items-center gap-2 w-full p-3 rounded-xl text-sm transition-all border",
                          option.primary 
                            ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90" 
                            : "bg-white text-foreground border-primary/10 hover:border-primary/30 hover:bg-primary/5"
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
                    className="flex items-center justify-center gap-1 w-full p-2 text-xs text-muted-foreground hover:text-primary transition-colors mt-2"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Go Back</span>
                  </button>
                )}
              </div>
            </div>

            <div className="p-3 bg-white border-t border-primary/5 text-[10px] text-center text-muted-foreground uppercase tracking-widest">
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
          "h-14 w-14 rounded-full shadow-xl transition-all duration-300",
          isOpen ? "bg-primary hover:bg-primary/90 rotate-90" : "bg-primary hover:bg-primary/90 shadow-primary/20"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </Button>
    </div>
  );
}
