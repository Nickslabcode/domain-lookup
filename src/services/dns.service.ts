import axios from 'axios';
import { DnsType } from '../enums/DnsType.enum';
import { DnsRecordResponse } from '../types/DnsRecordResponse';

export const getDnsRecordInfo = async (
  domain: string
): Promise<DnsRecordResponse[]> => {
  const response: DnsRecordResponse[] = [];

  for (const record of Object.values(DnsType)) {
    let recordResponse = null;

    try {
      recordResponse = (
        await axios.get(
          `https://dns.google/resolve?name=${domain}&type=${record}`,
          {
            onDownloadProgress: progressEvent => {
              console.log(progressEvent);
            },
          }
        )
      ).data.Answer;

      if (recordResponse) {
        response.push({
          type: record as DnsType,
          data: recordResponse,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return response;
};
