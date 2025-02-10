AI Short Video Generator
A platform designed to generate AI-powered short videos with subtitles and audio. This project utilizes various APIs for video generation, captioning, and integration with AI technologies like Gemini, Clerk, and Appwrite.

Features
Automated Video Creation: Generate videos with AI-driven content and subtitles.
Clerk Authentication: Use Clerk for managing user sign-ins and sign-ups.
Integration with AI Captioning Services: Captioning powered by AssemblyAI.
Seamless File Management: Store generated videos and related files in Appwrite.
Image Generation via Together AI: Generate custom images to include in videos.
Environment Variables

Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/ai-short-video-generator.git
cd ai-short-video-generator
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file in the root directory and add your API keys and secrets as shown in the environment variables section.

Start the development server:

bash
Copy
Edit
npm run dev
Access the app at http://localhost:3000 in your browser.

Usage
Sign in or sign up using Clerk authentication.
Generate AI short videos by integrating various APIs for video creation, captioning, and image generation.
Store and manage videos using Appwrite storage.
Technologies Used
Next.js: React framework for server-side rendering and API routes.
Clerk: For authentication and user management.
Gemini API: AI-powered content generation for video creation.
AssemblyAI: For generating captions for videos.
Appwrite: File storage and backend services.
Together AI: Image generation for video content.
