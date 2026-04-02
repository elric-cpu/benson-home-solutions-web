import { ai } from "./src/genkit-config";
import { vertexAI } from "@genkit-ai/google-genai";

async function listModels() {
    try {
        // Genkit doesn't have a direct "list models" in the plugin API that is easily accessible here
        // but we can try to generate with a few common ones
        const models = ['gemini-1.5-flash', 'gemini-1.5-flash-001', 'gemini-1.5-flash-002', 'gemini-1.0-pro'];
        
        for (const m of models) {
            try {
                console.log(`Testing model: ${m}`);
                await ai.generate({
                    model: vertexAI.model(m),
                    prompt: 'hi'
                });
                console.log(`✅ Model ${m} works!`);
            } catch (e: any) {
                console.log(`❌ Model ${m} failed: ${e.message}`);
            }
        }
    } catch (err: any) {
        console.error(err);
    }
}

listModels();
