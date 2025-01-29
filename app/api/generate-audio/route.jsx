import { storage } from "@/configs/AppwriteConfig";
import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

const client = new textToSpeech.TextToSpeechClient({
    apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
    try {
        const { text, id } = await req.json();

        const request = {
            input: { text: text },
            voice: { languageCode: 'en-US', ssmlGender: 'MALE' },
            audioConfig: { audioEncoding: 'MP3' },
        };

        // Synthesize speech
        const [response] = await client.synthesizeSpeech(request);
        const audioBuffer = Buffer.from(response.audioContent, 'binary');

        // Save to Appwrite storage
        const fileId = uuidv4(); // Generate a unique file ID
        const fileName = `ai-short-video-files/${id || fileId}.mp3`;

        const fileUploadResponse = await storage.createFile(
            process.env.APPWRITE_BUCKET_ID,
            fileId,
            new File([audioBuffer], fileName, { type: 'audio/mp3' })
        );

        const downloadUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${fileUploadResponse.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

        console.log(downloadUrl);

        return NextResponse.json({ Result: 'Success', downloadUrl });
    } catch (error) {
        console.error('Error creating audio file:', error);
        return NextResponse.json({ Result: 'Error', error: error.message });
    }
}

