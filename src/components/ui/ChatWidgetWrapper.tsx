import { getAIConfig } from '@/lib/ai/config';
import { ChatWidget } from './ChatWidget';

export async function ChatWidgetWrapper() {
  const config = await getAIConfig();
  const welcomeMessage = config.chatbotWelcomeMessage || 
    "I am Silas Vane, Senior Principal Architect of Logic & Structural Integrity. I have provided this interface for those who have apparently forgotten how to consult a search engine or the 2026 IRC. What is your data-specific inquiry, and how many seconds do you intend to waste?";

  return <ChatWidget initialWelcomeMessage={welcomeMessage} />;
}
