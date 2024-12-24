import axios from 'axios';

export const isCdnActive = async (domain: string) => {
  try {
    const response = await axios.get(
      `https://api-dl.nikola-nenovski.info/api/v1/cdn-check?domain=${domain}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
