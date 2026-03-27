/**
 * Benson Home Solutions - Agent Error Router
 * Maps build and runtime errors to the 14-specialist team.
 * "1 agent for every error at the end of the build."
 */

type AgentRole = {
  id: number;
  name: string;
  specialty: string;
};

const AGENTS: Record<number, AgentRole> = {
  1: { id: 1, name: 'Hank Rourke', specialty: 'Technical SEO' },
  2: { id: 2, name: 'Priya Deshmukh', specialty: 'Schema' },
  3: { id: 3, name: 'Silas Crowley', specialty: 'AEO/GEO' },
  4: { id: 4, name: 'Tess Malloy', specialty: 'Keyword Strategy' },
  6: { id: 6, name: 'Mari Vega', specialty: 'UX/UI' },
  7: { id: 7, name: 'Cole Brennan', specialty: 'Performance & Frontend' },
  8: { id: 8, name: 'Dima Volkov', specialty: 'Backend' },
  9: { id: 9, name: 'Jae Park', specialty: 'AI Engineer' },
  12: { id: 12, name: 'Gideon Shaw', specialty: 'QA & Testing' },
  14: { id: 14, name: 'Elias Mercer', specialty: 'PM / Tech Lead' },
};

export function routeError(errorType: string, message: string) {
  let agentId = 14; // Default to Elias (PM)

  if (message.includes('SEO') || message.includes('crawl')) agentId = 1;
  if (message.includes('schema') || message.includes('JSON-LD')) agentId = 2;
  if (
    message.includes('AEO') ||
    message.includes('GEO') ||
    message.includes('answer')
  )
    agentId = 3;
  if (
    message.includes('UI') ||
    message.includes('layout') ||
    message.includes('CSS')
  )
    agentId = 6;
  if (message.includes('performance') || message.includes('CWV')) agentId = 7;
  if (
    message.includes('backend') ||
    message.includes('DB') ||
    message.includes('API')
  )
    agentId = 8;
  if (
    message.includes('AI') ||
    message.includes('Gus') ||
    message.includes('Genkit')
  )
    agentId = 9;
  if (
    message.includes('test') ||
    message.includes('QA') ||
    message.includes('fail')
  )
    agentId = 12;

  const agent = AGENTS[agentId];
  console.error(`[AGENT ROUTER] Error: ${message}`);
  console.info(
    `[AGENT ASSIGNED] ${agent.name} (${agent.specialty}) is investigating this ${errorType}.`,
  );

  return agent;
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length >= 2) {
    routeError(args[0], args[1]);
  }
}
