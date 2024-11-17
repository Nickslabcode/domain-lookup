import axios from 'axios';

export const getDomainInfo = async (domain: string) => {
  try {
    const response = await axios.get(
      `https://domainlookup.nicknenovski.workers.dev/whois?domain=${domain}`,
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
