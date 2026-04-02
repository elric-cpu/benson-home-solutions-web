import { ai } from "../genkit-config";
import { z } from "genkit";
import { vertexAI } from "@genkit-ai/google-genai";

/**
 * Marketing Content Generation Flow
 * Uses Imagen 3 on Vertex AI for high-quality visuals.
 */

const ImageOutputSchema = z.object({
  prompt: z.string().describe("The detailed prompt for image generation"),
  url: z.string().optional().describe("URL of the generated image"),
  error: z.string().optional().describe("Error message if generation failed"),
});

const VideoOutputSchema = z.object({
  prompt: z.string().describe("The detailed prompt for video generation"),
  url: z.string().optional().describe("URL of the generated video"),
  status: z.string().describe("Generation status"),
  error: z.string().optional().describe("Error message if generation failed"),
});

const MarketingContentInputSchema = z.object({
  imagePrompts: z.array(z.string()).describe("List of prompts for image generation"),
  videoPrompts: z.array(z.string()).describe("List of prompts for video generation"),
});

const MarketingContentOutputSchema = z.object({
  generatedImages: z.array(ImageOutputSchema),
  generatedVideos: z.array(VideoOutputSchema),
});

export const marketingContentFlow = ai.defineFlow(
  {
    name: "marketingContentFlow",
    inputSchema: MarketingContentInputSchema,
    outputSchema: MarketingContentOutputSchema,
  },
  async ({ imagePrompts, videoPrompts }) => {
    // 1. Parallel Image Generation
    const imagePromises = imagePrompts.map(async (promptText) => {
      try {
        console.log(`[Marketing] Generating image for: ${promptText.substring(0, 30)}...`);
        const response = await ai.generate({
          model: vertexAI.model('imagen-3.0-generate-001'),
          prompt: promptText,
          config: {
            // Imagen specific config could go here
          }
        });

        const media = response.media;
        return {
          prompt: promptText,
          url: media?.url,
        };
      } catch (error: any) {
        console.error(`[Marketing] Image generation failed for "${promptText}":`, error.message);
        return {
          prompt: promptText,
          error: error.message,
        };
      }
    });

    // Veo support can be added here once the production request path is finalized.
    // Until then, return an explicit unsupported status instead of a fake asset URL.
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
  }
);
