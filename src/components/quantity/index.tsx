import { Box, Button, Icon } from '@sendsprint/ui-react';
import { MinusCircleOutline, PlusCircleOutline } from '@sendsprint/ui-react/dist/icons';
import React from 'react';

interface Props {
  handleMinusClick: () => void;
  handlePlusClick: () => void;
  quantity: number | string;
}

const Quantity = ({ handleMinusClick, handlePlusClick, quantity }: Props) => {
  return (
    <Box className="ss-flex ss-items-center ss-gap-3">
      <Button
        disabled={Number(quantity) < 2}
        variant="secondary"
        onClick={handleMinusClick}
        className="ss-rounded-full ss-w-10 ss-h-10 ss-p-0"
        label={<Icon size={24} svg={MinusCircleOutline} />}
      />
      <input value={quantity} disabled className="formInput__input ss-w-14 ss-pl-5 ss-h-10" />
      <Button
        variant="secondary"
        onClick={handlePlusClick}
        className="ss-rounded-full ss-w-10 ss-h-10 ss-p-0"
        label={<Icon size={24} svg={PlusCircleOutline} />}
      />
    </Box>
  );
};

export default Quantity;
