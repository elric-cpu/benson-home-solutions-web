import { ai } from "../genkit-config";
import { z } from "genkit";

const DEPARTMENT_PROMPTS = {
  marketing: {
    agents: [
      { name: "Content Planner", prompt: "Create a 30-day content calendar for home maintenance tips." },
      { name: "SEO Optimizer", prompt: "Suggest keyword clusters for Harney County drainage issues." }
    ],
    manager: "Marketing Director"
  },
  branding: {
    agents: [
      { name: "Voice Auditor", prompt: "Review these posts for 'corporate fluff' and replace with Elric's voice." },
    ],
    manager: "Brand Manager"
  },
  leadGen: {
    agents: [
      { name: "Funnel Strategist", prompt: "Optimize the Rot Risk Simulator for higher conversion." }
    ],
    manager: "Growth Lead"
  }
};

const DepartmentIdeationInputSchema = z.object({
  department: z.enum(["marketing", "branding", "leadGen"]),
  goal: z.string(),
});

export const departmentIdeationFlow = ai.defineFlow(
  {
    name: "departmentIdeationFlow",
    inputSchema: DepartmentIdeationInputSchema,
    outputSchema: z.array(z.string()),
  },
  async ({ department, goal }) => {
    const config = DEPARTMENT_PROMPTS[department];
    const results: string[] = [];

    for (const agent of config.agents) {
      const response = await ai.generate({
        prompt: `Department: ${department}. Goal: ${goal}. Agent ${agent.name} Task: ${agent.prompt}`,
      });
      results.push(`${agent.name}: ${response.text}`);
    }

    return results;
  }
);

export const productionFlow = ai.defineFlow(
  {
    name: "productionFlow",
    inputSchema: z.object({ task: z.string() }),
    outputSchema: z.string(),
  },
  async ({ task }) => {
    const response = await ai.generate({
      prompt: `Production task for Benson Home Solutions: ${task}. 
      Focus on specialized tools like interior concrete saws and expert diagnosis.`,
    });
    return response.text;
  }
);

export const websiteMaintenanceFlow = ai.defineFlow(
  {
    name: "websiteMaintenanceFlow",
    inputSchema: z.object({ issue: z.string() }),
    outputSchema: z.string(),
  },
  async ({ issue }) => {
    const response = await ai.generate({
      prompt: `Website issue for bensonhomesolutions.com: ${issue}. 
      Ensure systems-age truth-telling and transparent pricing are preserved.`,
    });
    return response.text;
  }
);
