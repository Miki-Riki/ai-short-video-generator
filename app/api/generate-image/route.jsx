import { storage } from "@/configs/AppwriteConfig";
import Together from "together-ai";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { prompt, id } = await req.json();

        // Validate prompt
        if (!prompt) {
            throw new Error("Prompt is required");
        }

        // 1. Generate Image using Together AI
        const together = new Together({
            apiKey: process.env.TOGETHER_AI_IMAGE_API_KEY,
        });

        const response = await together.images.create({
            model: "black-forest-labs/FLUX.1-schnell-Free",
            prompt: prompt,
            width: 1024,
            height: 768,
            steps: 1,
            n: 1,
            response_format: "b64_json",
        });

        if (!response || !response.data || response.data.length === 0) {
            throw new Error("Invalid response from Together API for image generation.");
        }

        // Extract base64 image data
        const base64Image = `data:image/png;base64,${response.data[0].b64_json}`;
        const imageBuffer = Buffer.from(base64Image.split(",")[1], "base64");

        // 2. Upload to Appwrite Storage with fileName
        const fileId = uuidv4();
        const fileName = `ai-short-video-files/${id || fileId}.png`;

        const fileUploadResponse = await storage.createFile(
            process.env.APPWRITE_BUCKET_ID,
            fileId,               
            new File([imageBuffer], fileName, { type: 'image/png' })
        );

        // Generate download URL for the uploaded file
        const downloadUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${fileUploadResponse.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

        return NextResponse.json({ result: downloadUrl });
    } catch (error) {
        console.error("Error generating image:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
