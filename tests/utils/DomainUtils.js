import { toASCII } from 'punycode-esm';

export class DomainUtils {
  static punyEncode(domain) {
    if (typeof domain !== 'string') {
      throw new Error('domain must be a string');
    }

    return toASCII(domain);
  }

  static extractFromUrl(url) {
    if (typeof url !== 'string') {
      throw new Error('Url must be a string');
    }

    const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([^/?#]+)/;
    const match = url.match(domainRegex);

    return match ? match[1] : '';
  }

  static domainPipe(...fns) {
    return function (x) {
      return fns.reduce((result, nextFn) => nextFn(result), x);
    };
  }

  static punyDecode(encodedDomain) {
    if (typeof domain !== 'string') {
      throw new Error('domain must be a string');
    }

    return toUnicode(encodedDomain);
  }

  static isDomainValid(domain) {
    const domainRegex =
      /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,}$/;

    return domainRegex.test(domain);
  }
}
