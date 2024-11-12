import axios from 'axios';

export const getDomainSslInfo = async (domain: string) => {
  try {
    const response = await axios.get(
      `https://domainlookup.nicknenovski.workers.dev/${domain}`
    );

    console.dir(response);

    return response;
  } catch (error) {
    console.error(error);
  }
};
