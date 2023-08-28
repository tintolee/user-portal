import ClientApi from '@src/types/client';

export const resolveRecipientName = (data: ClientApi.Recipient | null | undefined) => {
  if (!data) return '';

  const { firstName, lastName } = data;
  const formattedFirstName = `${firstName[0]?.toUpperCase()}${
    firstName.length > 1 ? firstName.slice(1) : ''
  }`;
  const formattedLastName = `${lastName[0]?.toUpperCase()}${
    lastName.length > 1 ? lastName.slice(1) : ''
  }`;

  return formattedFirstName + ' ' + formattedLastName;
};
