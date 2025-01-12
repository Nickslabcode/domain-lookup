export const isDomainValid = (domain: string): boolean => {
  const domainRegex =
    /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,}$/;

  return domainRegex.test(domain);
};
