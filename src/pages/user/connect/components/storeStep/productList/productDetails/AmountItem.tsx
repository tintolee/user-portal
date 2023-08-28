import { Box, Text } from '@sendsprint/ui-react';
import React from 'react';
import cs from 'classnames';
import { DisplayAmount } from '@src/components';
import { getMonetaryValue } from '@src/utils/currency';

interface AmountItemProps {
  amount: string;
  // eslint-disable-next-line no-unused-vars
  handleAmountUpdate: (amt: string) => void;
  currency: string;
  isActive: boolean;
}

const AmountItem: React.FC<AmountItemProps> = ({
  amount,
  handleAmountUpdate,
  currency,
  isActive
}) => {
  return (
    <button
      type="button"
      onClick={() => handleAmountUpdate(amount)}
      className={cs(
        'focus:ss-focus-ring ss-flex ss-justify-between ss-items-center ss-gap-3 ss-cursor-pointer ss-mb-2 ss-mr-3 ss-p-2 ss-border ss-border-neutral-20  ss-rounded',
        {
          'ss-bg-success-100': isActive
        }
      )}>
      <Text variant="paragraphSmall" className="ss-text-neutral-40 ss-font-bold">
        <DisplayAmount
          value={getMonetaryValue(Number(amount))}
          currency={currency}
          decimalScale={0}
        />
      </Text>
      <Box className="ss-relative ss-w-5 ss-h-5 ss-flex ss-justify-center ss-items-center ss-rounded-full ss-border ss-border-primary1-500">
        {isActive && <Box className="ss-w-3 ss-h-3 ss-rounded-full ss-bg-primary1-500" />}
      </Box>
    </button>
  );
};

export default AmountItem;
