import { GUS_GREETINGS } from '@/lib/ai/config';
import { ChatWidget } from './ChatWidget';

/**
 * PROJECT GUS: WRAPPER
 * Decouples chat UI from configuration and persona logic.
 */
export function ChatWidgetWrapper() {
  // Randomize greeting from the Gus personality bank
  const randomGreeting = GUS_GREETINGS[Math.floor(Math.random() * GUS_GREETINGS.length)];

  return <ChatWidget initialWelcomeMessage={randomGreeting} />;
}
