export type UrlHashData = {
  password: string;
  email: string;
  name: string;
};

/**
 * Extract data from the Url's Hash
 * @param hash
 */
export const getUrlHashData = ({ hash }: Location): UrlHashData => {
  let decodedHash: string;
  let password = '';
  let email = '';
  let name = '';

  try {
    decodedHash = decodeURIComponent(hash);
  } catch (e) {
    return returnedData();
  }

  // hash should contain '#' and at least one other character
  if (decodedHash.length < 1) {
    return returnedData();
  }

  [password = '', email = '', name = ''] = decodedHash
    .substr(1) // removes the hash character
    .split('|');

  return returnedData();

  function returnedData() {
    return { password, email, name };
  }
};
