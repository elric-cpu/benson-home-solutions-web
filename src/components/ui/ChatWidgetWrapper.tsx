import { getAIConfig } from '@/lib/ai/config';
import { ChatWidget } from './ChatWidget';

const GUS_GREETINGS = [
  'Every second you spend looking at this chat is a second your house is getting closer to a condemned sign. Give me the dimensions, the damage, and the deadline. Now.',
  'If I wanted to make friends, I’d join a bowling league. I’m here to fix things. State the failure clearly or close the window.',
  "If I had a nickel for every person who didn't know their own square footage, I’d be retired. Dimensions. Timeline. Origin. Go.",
  "I respond to data. What’s the PSI, where’s the leak, and why haven't you turned the main valve off yet?",
];

export async function ChatWidgetWrapper() {
  const config = await getAIConfig();

  // Randomize the greeting on load
  const randomGreeting =
    GUS_GREETINGS[Math.floor(Math.random() * GUS_GREETINGS.length)];

  const welcomeMessage = config.chatbotWelcomeMessage || randomGreeting;

  return <ChatWidget initialWelcomeMessage={welcomeMessage} />;
}
