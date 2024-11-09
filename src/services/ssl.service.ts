import axios from 'axios';

export const getDomainSslInfo = async (domain: string) => {
  const headers = { apikey: import.meta.env.VITE_SSL_API_KEY };

  try {
    const response = await axios.get(
      `https://api.certspotter.com/v1/issuances?domain=${domain}&expand=dns_names&expand=issuer`,
      { headers }
    );

    console.dir(response);

    return response;
  } catch (error) {
    console.error(error);
  }
};
