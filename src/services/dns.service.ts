import axios from 'axios';
import { DnsType } from '../enums/DnsType.enum';
import { DnsRecordAnswer } from '../types/DnsRecordAnswer';

export const getDnsRecordInfo = async (
  domain: string
): Promise<Record<DnsType, DnsRecordAnswer[] | string>> => {
  try {
    const response = await axios.get(
      `https://domainlookup.nicknenovski.workers.dev/dns?domain=${domain}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch DNS records');
  }
};
