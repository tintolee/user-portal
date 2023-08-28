import { Button, Icon } from '@sendsprint/ui-react';
import { CloseOutline } from '@sendsprint/ui-react/dist/icons';
import React from 'react';

interface Props {
  onClick?: () => void;
}

const CloseBtn = ({ onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      label={<Icon svg={CloseOutline} size={24} />}
      variant="tertiary"
      className="ss-p-0"
    />
  );
};

export default CloseBtn;
