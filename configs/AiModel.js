const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Write a script to generate 30 seconds video on topic: Interesting historical story along with Al image prompt in Realistic format for\neach scene and give me result in JSON format with ImagePrompt and ContentText as field" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n[\n  {\n    \"ImagePrompt\": \"Realistic image of a bustling medieval marketplace, vibrant colors, people in period clothing bartering goods, a focus on a specific stall selling spices\",\n    \"ContentText\": \"Our story begins in 1347, the heart of the Black Death.  Imagine the bustling marketplace of Florence, a city teeming with life, yet unknowingly on the brink of catastrophe...\"\n  }" },
            ],
        },
    ],
});
