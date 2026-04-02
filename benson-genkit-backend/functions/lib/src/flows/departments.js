"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.websiteMaintenanceFlow = exports.productionFlow = exports.departmentIdeationFlow = void 0;
const genkit_config_1 = require("../genkit-config");
const genkit_1 = require("genkit");
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
const DepartmentIdeationInputSchema = genkit_1.z.object({
    department: genkit_1.z.enum(["marketing", "branding", "leadGen"]),
    goal: genkit_1.z.string(),
});
exports.departmentIdeationFlow = genkit_config_1.ai.defineFlow({
    name: "departmentIdeationFlow",
    inputSchema: DepartmentIdeationInputSchema,
    outputSchema: genkit_1.z.array(genkit_1.z.string()),
}, async ({ department, goal }) => {
    const config = DEPARTMENT_PROMPTS[department];
    const results = [];
    for (const agent of config.agents) {
        const response = await genkit_config_1.ai.generate({
            prompt: `Department: ${department}. Goal: ${goal}. Agent ${agent.name} Task: ${agent.prompt}`,
        });
        results.push(`${agent.name}: ${response.text}`);
    }
    return results;
});
exports.productionFlow = genkit_config_1.ai.defineFlow({
    name: "productionFlow",
    inputSchema: genkit_1.z.object({ task: genkit_1.z.string() }),
    outputSchema: genkit_1.z.string(),
}, async ({ task }) => {
    const response = await genkit_config_1.ai.generate({
        prompt: `Production task for Benson Home Solutions: ${task}. 
      Focus on specialized tools like interior concrete saws and expert diagnosis.`,
    });
    return response.text;
});
exports.websiteMaintenanceFlow = genkit_config_1.ai.defineFlow({
    name: "websiteMaintenanceFlow",
    inputSchema: genkit_1.z.object({ issue: genkit_1.z.string() }),
    outputSchema: genkit_1.z.string(),
}, async ({ issue }) => {
    const response = await genkit_config_1.ai.generate({
        prompt: `Website issue for bensonhomesolutions.com: ${issue}. 
      Ensure systems-age truth-telling and transparent pricing are preserved.`,
    });
    return response.text;
});
//# sourceMappingURL=departments.js.map