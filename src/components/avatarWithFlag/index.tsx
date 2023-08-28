import Api from '@sendsprint/api-types';
import { Avatar, Box, Flag } from '@sendsprint/ui-react';
import React from 'react';

interface Props {
  initials: string;
  country: Api.Model.CountryInitials;
}

const AvatarWithFlag = ({ country, initials }: Props) => {
  return (
    <Box className="ss-relative">
      <Avatar initials={initials} size={48} />
      <Box className="ss-absolute ss-bottom-0 ss--right-1">
        <Flag countryInitials={country} size={16} />
      </Box>
    </Box>
  );
};

export default AvatarWithFlag;
