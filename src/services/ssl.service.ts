import axios from 'axios';

export const getDomainSslInfo = async (domain: string) => {
  try {
    const response = await axios.get(
      `https://domainlookup.nicknenovski.workers.dev/ssl?domain=${domain}`,
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
