import Api from '@sendsprint/api-types';
import { Box, Icon, Text } from '@sendsprint/ui-react';
import { Gift, Money } from '@sendsprint/ui-react/dist/icons';
import { BoxWithIcon, DisplayAmount } from '@src/components';
import ClientApi from '@src/types/client';
import { getMonetaryValue } from '@src/utils/currency';
import React from 'react';
import { RxDotFilled } from 'react-icons/rx';
import { useTransactionRow } from '../../hooks';
import { getGeneralStatus, getStatusIconSvg } from '../../utils';

interface Props {
  item: ClientApi.Transaction;
  handleOpenModal?: () => void;
  as?: 'link' | 'button';
}

const TransactionRow = ({ item, handleOpenModal, as = 'button' }: Props) => {
  const { recipientName, status, receiveAmount, receiveCurrency, sendAmount, sendCurrency } = item;

  const { displayedStatus, formattedDate, handleClick, recipient } = useTransactionRow({
    item,
    as,
    handleOpenModal
  });
  return (
    <button
      onClick={handleClick}
      type="button"
      className="ss-p-2 ss-block ss-w-full focus:ss-focus-ring md:ss-p-4 ss-rounded-lg hover:ss-bg-success-100">
      <Box className="ss-flex ss-items-center ss-justify-between ss-gap-4">
        <BoxWithIcon
          smallIcon={
            <Icon
              size={'100%'}
              className="ss-absolute ss-bottom-0 ss--right-1"
              svg={getStatusIconSvg(getGeneralStatus(status))}
            />
          }
          mainIcon={recipient?.paymentType === Api.Model.PaymentType.GiftCard ? Gift : Money}
        />
        <Box className="ss-flex-1">
          <Text className="ss-font-bold ss-text-left ss-text-neutral-500">{recipientName}</Text>
          <Text
            className="ss-text-neutral-500 ss-text-left ss-flex ss-flex-col md:ss-flex-row ss-items-start md:ss-items-center ss-flex-wrap"
            variant="paragraphSmall">
            {displayedStatus}{' '}
            {true && (
              <>
                <RxDotFilled className="ss-hidden md:ss-block" />{' '}
                <span className="ss-break-all ss-text-left">{formattedDate}</span>{' '}
              </>
            )}
          </Text>
        </Box>
        <Box className="ss-flex ss-flex-col ss-gap-0 ss-items-center">
          <Text className="ss-font-bold" variant="paragraphSmall">
            <DisplayAmount
              value={getMonetaryValue(sendAmount)}
              currency={sendCurrency}
              decimalScale={2}
            />
          </Text>
          <Text variant="paragraphSmall">
            <DisplayAmount
              value={getMonetaryValue(receiveAmount)}
              currency={receiveCurrency}
              decimalScale={2}
            />
          </Text>
        </Box>
      </Box>
    </button>
  );
};

export default TransactionRow;
