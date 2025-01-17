import { toASCII } from 'punycode-esm';

export const punyEncode = (domain: string): string => toASCII(domain);
