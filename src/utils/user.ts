type GetFullNameOptions = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
/**
 * Get a user's full name when we pass the first and last name
 * @param {string} firstName the user's first name
 * @param {string} middleName the user's middle name
 * @param {string} lastName the user's last name
 */
const getFullName = ({
  firstName = '',
  middleName = '',
  lastName = ''
}: GetFullNameOptions): string => {
  return [firstName, middleName, lastName]
    .filter((i) => !!i)
    .join(' ')
    .trim();
};

/**
 * Get the user's initials. Picks the first letter of the first word & first letter of the last word and capitalizes them.
 * This should match names like 'Bart van Woustraat', 'John Doe' or 'Carlos W. Hoffman' as 'BW', 'JD' or 'CH' respectively.
 * @param {string} name the user's (full) name
 */
const getInitials = (name: string): string => {
  const words = name.trim().split(/[\s]+/);
  const firstWord = words[0];
  let lastWord = '';
  if (words.length > 1) {
    lastWord = words[words.length - 1];
  }
  const getFirstLetter = (word: string): string => word.substr(0, 1).toUpperCase();

  return `${getFirstLetter(firstWord)}${getFirstLetter(lastWord)}`;
};

export { getFullName, getInitials };
