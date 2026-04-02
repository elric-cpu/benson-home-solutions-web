'use client';

import { useState, useRef, useEffect } from 'react';

interface CaptchaProps {
  onVerify: (isValid: boolean) => void;
}

export function Captcha({ onVerify }: CaptchaProps) {
  const startTimeRef = useRef<number>(0);
  const [mathValue, setMathValue] = useState('');
  const [isBot, setIsBot] = useState(false);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  // Simple math challenge (anti-bot)
  const challenge = { a: 5, b: 3, result: 8 };

  const handleMathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setMathValue(val);
    
    // Check if correct AND at least 2 seconds have passed (prevents instant bot submits)
    const timePassed = (Date.now() - startTimeRef.current) / 1000;
    if (parseInt(val) === challenge.result && timePassed > 2 && !isBot) {
      onVerify(true);
    } else {
      onVerify(false);
    }
  };

  return (
    <div className="space-y-4 py-4 border-t border-border mt-6">
      {/* Honeypot - hidden from humans */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hp_email_confirm">Do not fill this if you are human</label>
        <input
          type="text"
          id="hp_email_confirm"
          name="hp_email_confirm"
          tabIndex={-1}
          autoComplete="off"
          onChange={() => setIsBot(true)}
        />
      </div>

      {/* Simple Math Challenge */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <label htmlFor="math-challenge" className="text-sm font-bold text-charcoal">
          Security Check: What is {challenge.a} + {challenge.b}? *
        </label>
        <input
          type="number"
          id="math-challenge"
          required
          value={mathValue}
          onChange={handleMathChange}
          className="w-20 rounded-lg border border-border px-3 py-2 text-charcoal bg-surface focus:border-oxblood focus:ring-1 focus:ring-oxblood transition-colors"
          placeholder="?"
        />
      </div>
      <p className="text-[10px] text-slate/60 uppercase tracking-widest font-bold">
        Required to prevent automated spam
      </p>
    </div>
  );
}
