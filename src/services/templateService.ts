import axios, { AxiosResponse } from 'axios';
import { createClient } from 'redis';

// Create a Redis client
const client = createClient();

/**
 * Fetches a template from a given URL
 * @param templateURL The URL of the template
 * @returns The fetched template as a string
 * @throws If there's an error fetching the template
 */
async function fetchTemplate(templateURL: string): Promise<string> {
  try {
    // Connect to Redis
    await client.connect();

    // Check if the template is cached in Redis
    const cachedTemplate: string | null = await client.get(templateURL);
    if (cachedTemplate) {
      // Disconnect from Redis and return the cached template
      await client.disconnect();
      return cachedTemplate;
    }

    // Fetch the template from the provided URL
    const response: AxiosResponse<string> = await axios.get(templateURL);
    const template: string = response.data;

    // Cache the template in Redis
    await client.set(templateURL, template);

    // Disconnect from Redis
    await client.disconnect();

    return template;
  } catch (error) {
    console.error('Error fetching template:', error);
    throw new Error('Failed to fetch template');
  }
}

export default fetchTemplate;
