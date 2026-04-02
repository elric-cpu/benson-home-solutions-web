"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketingContentFlow = void 0;
const genkit_config_1 = require("../genkit-config");
const genkit_1 = require("genkit");
const google_genai_1 = require("@genkit-ai/google-genai");
const ImageOutputSchema = genkit_1.z.object({
    prompt: genkit_1.z.string().describe("The detailed prompt for image generation"),
    url: genkit_1.z.string().optional().describe("URL of the generated image"),
    error: genkit_1.z.string().optional().describe("Error message if generation failed"),
});
const VideoOutputSchema = genkit_1.z.object({
    prompt: genkit_1.z.string().describe("The detailed prompt for video generation"),
    url: genkit_1.z.string().optional().describe("URL of the generated video"),
    status: genkit_1.z.string().describe("Generation status"),
    error: genkit_1.z.string().optional().describe("Error message if generation failed"),
});
const MarketingContentInputSchema = genkit_1.z.object({
    imagePrompts: genkit_1.z.array(genkit_1.z.string()).describe("List of prompts for image generation"),
    videoPrompts: genkit_1.z.array(genkit_1.z.string()).describe("List of prompts for video generation"),
});
const MarketingContentOutputSchema = genkit_1.z.object({
    generatedImages: genkit_1.z.array(ImageOutputSchema),
    generatedVideos: genkit_1.z.array(VideoOutputSchema),
});
exports.marketingContentFlow = genkit_config_1.ai.defineFlow({
    name: "marketingContentFlow",
    inputSchema: MarketingContentInputSchema,
    outputSchema: MarketingContentOutputSchema,
}, async ({ imagePrompts, videoPrompts }) => {
    const imagePromises = imagePrompts.map(async (promptText) => {
        try {
            console.log(`[Marketing] Generating image for: ${promptText.substring(0, 30)}...`);
            const response = await genkit_config_1.ai.generate({
                model: google_genai_1.vertexAI.model('imagen-3.0-generate-001'),
                prompt: promptText,
                config: {}
            });
            const media = response.media;
            return {
                prompt: promptText,
                url: media?.url,
            };
        }
        catch (error) {
            console.error(`[Marketing] Image generation failed for "${promptText}":`, error.message);
            return {
                prompt: promptText,
                error: error.message,
            };
        }
    });
    const videoResults = videoPrompts.map((promptText) => ({
        prompt: promptText,
        status: "unsupported",
        error: "Video generation is not enabled for this deployment.",
    }));
    const imageResults = await Promise.all(imagePromises);
    return {
        generatedImages: imageResults,
        generatedVideos: videoResults,
    };
});
//# sourceMappingURL=marketingContentFlow.js.map