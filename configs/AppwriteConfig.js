import { Client, Storage } from 'appwrite';

export const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1')
client.setProject(process.env.APPWRITE_PROJECT_ID);

const storage = new Storage(client);

export { storage };