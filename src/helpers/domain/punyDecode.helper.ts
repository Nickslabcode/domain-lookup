import { toUnicode } from 'punycode-esm';

export const punyDecode = (encodedDomain: string): string =>
  toUnicode(encodedDomain);
