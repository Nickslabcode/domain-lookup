import axios from 'axios';

export const getChangelogInfo = async () => {
  try {
    const response = await axios.get(
      'https://api.github.com/repos/Nickslabcode/domain-info-lookup/releases'
    );

    return response.data[0];
  } catch (error) {
    throw new Error(
      `There was a problem fetching the changelog data: ${error}`
    );
  }
};
