"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketingContentFlow = void 0;
const genkit_config_1 = require("../genkit-config");
const genkit_1 = require("genkit");
const vertexai_1 = require("@genkit-ai/vertexai");
const ImagePromptSchema = genkit_1.z.object({
    prompt: genkit_1.z.string().describe("The detailed prompt for image generation"),
    url: genkit_1.z.string().optional().describe("URL of the generated image"),
});
const VideoPromptSchema = genkit_1.z.object({
    prompt: genkit_1.z.string().describe("The detailed prompt for video generation"),
    url: genkit_1.z.string().optional().describe("URL of the generated video"),
});
const MarketingContentInputSchema = genkit_1.z.object({
    imagePrompts: genkit_1.z.array(genkit_1.z.string()).describe("List of prompts for image generation"),
    videoPrompts: genkit_1.z.array(genkit_1.z.string()).describe("List of prompts for video generation"),
});
const MarketingContentOutputSchema = genkit_1.z.object({
    generatedImages: genkit_1.z.array(ImagePromptSchema),
    generatedVideos: genkit_1.z.array(VideoPromptSchema),
});
exports.marketingContentFlow = genkit_config_1.ai.defineFlow({
    name: "marketingContentFlow",
    inputSchema: MarketingContentInputSchema,
    outputSchema: MarketingContentOutputSchema,
}, async ({ imagePrompts, videoPrompts }) => {
    const generatedImages = [];
    const generatedVideos = [];
    // Image Generation using Vertex AI Imagen 3
    for (const promptText of imagePrompts) {
        try {
            const response = await genkit_config_1.ai.generate({
                model: vertexai_1.vertexAI.model('imagen-3.0-generate-002'),
                prompt: promptText,
            });
            const media = response.media();
            if (media) {
                generatedImages.push({
                    prompt: promptText,
                    url: media.url,
                });
            }
        }
        catch (error) {
            console.error(`Error generating image for prompt "${promptText}":`, error);
        }
    }
    // Video Generation (Simulated/Placeholder as Veo support in Genkit 1.x plugin is maturing)
    for (const promptText of videoPrompts) {
        generatedVideos.push({
            prompt: promptText,
            url: "https://example.com/placeholder-video.mp4", // Placeholder
        });
    }
    return {
        generatedImages,
        generatedVideos,
    };
});
//# sourceMappingURL=marketingContentFlow.js.map