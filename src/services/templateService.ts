import axios from 'axios';
import { createClient } from 'redis';

const client = createClient();

async function fetchTemplate(templateURL: string): Promise<string> {
  try {
    await client.connect();
    const cachedTemplate: string | null = await client.get(templateURL);

    if (cachedTemplate) {
      await client.disconnect();
      return cachedTemplate;
    }

    const response = await axios.get(templateURL);
    const template: string = response.data;

    await client.set(templateURL, template);
    await client.disconnect();

    return template;
  } catch (error) {
    console.error('Error fetching template:', error);
    throw new Error('Failed to fetch template');
  }
}
export default fetchTemplate;