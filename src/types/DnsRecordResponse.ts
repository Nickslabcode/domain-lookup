import { DnsType } from '../enums/DnsType.enum';
import { DnsRecordAnswer } from './DnsRecordAnswer';

export type DnsRecordResponse = {
  type: DnsType;
  data: DnsRecordAnswer[] | string;
};
