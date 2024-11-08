import axios from 'axios';

export const getDomainInfo = async (domain: string) => {
  const headers = { apikey: import.meta.env.API_KEY };
  try {
    const response = await axios.get(
      `https://api.apilayer.com/whois/query?domain=${domain}`,
      {
        headers,
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
