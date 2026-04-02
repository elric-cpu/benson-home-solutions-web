import fs from 'fs';
import path from 'path';
import { VertexAI } from '@google-cloud/vertexai';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

interface MediaItem {
  path: string;
  image_prompts: string[];
  video_prompts: string[];
}

// Function to add a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function generateManualMedia() {
  console.log("🚀 Starting Manual Media Generation...");

  const manualPlan: MediaItem[] = [
    {
      path: '/',
      image_prompts: [
        "A photorealistic image of a modern, well-maintained home in the Mid-Willamette Valley, Oregon. The house should be a two-story craftsman with a covered front porch. The landscaping is neat and tidy, with a mix of native Oregon plants. The sky is slightly overcast, but the overall mood is warm and inviting. The image should be shot with a 35mm lens to give a natural, slightly wide-angle feel.",
        "A close-up shot of a Benson Home Solutions technician inspecting the flashing on a roof. The technician is wearing a clean, professional uniform with the company logo. The roof is a composite shingle roof, and the flashing is around a brick chimney. The image should be sharp and detailed, showing the technician's focused expression and the quality of their work.",
        "A wide shot of a Benson Home Solutions truck parked in front of a house in a suburban neighborhood in Salem, Oregon. The truck is a clean, modern Ford Transit with the company logo on the side. The house is a typical Oregon-style home, with a mix of wood and stone siding. The sun is setting, casting a warm glow over the scene.",
      ],
      video_prompts: [
        "A 15-second video of a drone flying over a beautiful, well-maintained home in the Oregon countryside. The video should start with a wide shot of the house and then slowly zoom in on the roof, where a Benson Home Solutions technician is performing an inspection. The video should be shot in 4K and have a smooth, cinematic feel.",
      ],
    },
    {
      path: '/about',
      image_prompts: [
        "A portrait of Elric Benson, the owner of Benson Home Solutions. He is a man in his late 30s with a friendly and trustworthy face. He is wearing a a branded polo shirt and standing in front of a neutral background. The lighting is soft and professional.",
        "A team photo of the Benson Home Solutions crew. They are a diverse group of men and women of various ages, all wearing company uniforms. They are standing in front of a company truck, and they all look happy and professional.",
        "A photo of the Benson Home Solutions office. It is a small, modern office with a a reception area. The company logo is visible on the wall behind the reception desk.",
      ],
      video_prompts: [
        "A 30-second video of Elric Benson talking about the company's mission and values. He is speaking directly to the camera in a friendly and engaging way. The video is shot in his office, and there are shots of the team working in the background.",
      ],
    },
  ];

  const vertexAI = new VertexAI({
    project: process.env.GCLOUD_PROJECT || '',
    location: 'global',
  });

  const imageModel = vertexAI.getGenerativeModel({
    model: 'imagen-3.0-generate-001',
  });

  const videoModel = vertexAI.getGenerativeModel({
    model: 'veo-3.1-generate-001',
  });

  for (const item of manualPlan) {
    console.log(`  - Generating media for: ${item.path}`);

    // Generate images
    for (const prompt of item.image_prompts) {
      try {
        const request = {
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
        };
        const response = await imageModel.generateContent(request);
        const image = response.response.candidates[0].content.parts[0].fileData;
        const imageName = `${item.path.replace(/\//g, '_')}_${Date.now()}.png`;
        const imagePath = path.resolve(process.cwd(), 'public/images', imageName);
        fs.writeFileSync(imagePath, image.data, 'base64');
        console.log(`    - Image generated: ${imageName}`);
      } catch (error) {
        if (error.message.includes('429')) {
          console.warn(`    - Quota limit reached for images. Please try again later.`);
        } else {
          console.warn(`    - Error generating image: ${error.message}`);
        }
      }
      await delay(60000); // Add a 60-second delay between image requests
    }

    // Generate videos
    for (const prompt of item.video_prompts) {
      try {
        const request = {
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
        };
        const response = await videoModel.generateContent(request);
        const video = response.response.candidates[0].content.parts[0].fileData;
        const videoName = `${item.path.replace(/\//g, '_')}_${Date.now()}.mp4`;
        const videoPath = path.resolve(process.cwd(), 'public/videos', videoName);
        fs.writeFileSync(videoPath, video.data, 'base64');
        console.log(`    - Video generated: ${videoName}`);
      } catch (error) {
        if (error.message.includes('429')) {
          console.warn(`    - Quota limit reached for videos. Please try again later.`);
        } else {
          console.warn(`    - Error generating video: ${error.message}`);
        }
      }
      await delay(120000); // Add a 120-second delay between video requests
    }
  }

  console.log(`✅ Manual media generation complete.`);
}

generateManualMedia();
