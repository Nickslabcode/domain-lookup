import axios from 'axios';

export const isWordpressInstalled = async (domain: string) => {
  try {
    const response = await axios.get(
      `https://api-dl.nikola-nenovski.info/api/v1/wp-check?domain=${domain}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
