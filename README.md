# AI Short Video Generator

A platform designed to generate AI-powered short videos with subtitles and audio. This project utilizes various APIs for video generation, captioning, and integration with AI technologies like **Gemini**, **Clerk**, and **Appwrite**.

## Features
- **Automated Video Creation:** Generate videos with AI-driven content and subtitles.
- **Clerk Authentication:** Use Clerk for managing user sign-ins and sign-ups.
- **Integration with AI Captioning Services:** Captioning powered by AssemblyAI.
- **Seamless File Management:** Store generated videos and related files in Appwrite.
- **Image Generation via Together AI:** Generate custom images to include in videos.

## Environment Variables

Before running the project, make sure to set the following environment variables in your `.env` file:

```env
# Database Configuration
EXAMPLE_NEXT_PUBLIC_DRIZZLE_DATABASE_URL=your_api_key

# Clerk Authentication
EXAMPLE_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_api_key
EXAMPLE_CLERK_SECRET_KEY=your_api_key
EXAMPLE_NEXT_PUBLIC_CLERK_SIGN_IN_URL=your_url
EXAMPLE_NEXT_PUBLIC_CLERK_SIGN_UP_URL=your_url

# Gemini API for AI-powered video generation
EXAMPLE_NEXT_PUBLIC_GEMINI_API_KEY=your_api_key

# Google API for Voice-to-Text
EXAMPLE_GOOGLE_API_KEY=your_api_key

# AssemblyAI for Captioning
EXAMPLE_ASSEMBLY_CAPTION_API_KEY=your_api_key

# Appwrite for File Storage
EXAMPLE_APPWRITE_PROJECT_ID=your_api_key
EXAMPLE_APPWRITE_BUCKET_ID=your_api_key

# Together AI Image Generation
EXAMPLE_TOGETHER_AI_IMAGE_API_KEY=your_api_key
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Miki-Riki/ai-short-video-generator.git
   cd ai-short-video-generator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API keys and secrets as shown in the environment variables section.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Access the app at `http://localhost:3000` in your browser.

## Usage

- Sign in or sign up using Clerk authentication.
- Generate AI short videos by integrating various APIs for video creation, captioning, and image generation.
- Store and manage videos using Appwrite storage.

## Technologies Used
- **Next.js**: React framework for server-side rendering and API routes.
- **Clerk**: For authentication and user management.
- **Gemini API**: AI-powered content generation for video creation.
- **AssemblyAI**: For generating captions for videos.
- **Appwrite**: File storage and backend services.
- **Together AI**: Image generation for video content.
