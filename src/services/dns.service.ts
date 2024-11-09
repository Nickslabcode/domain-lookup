import axios from 'axios';
import { DnsType } from '../enums/DnsType.enum';

export const getDnsRecordInfo = async (domain: string, type: DnsType) => {
  try {
    const response = await axios.get(
      `https://dns.google/resolve?name=${domain}&type=${type}`
    );
    if (!response.data.Answer)
      throw new Error(
        `No records found for the given DNS type for ${domain}. Double-check your domain name for typos or try with a different DNS type.`
      );

    return response.data.Answer;
  } catch (error) {
    console.error(error);
  }
};
