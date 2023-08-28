import { Box, ButtonLink, Icon, Text } from '@sendsprint/ui-react';
import { Path } from '@src/navigations/routes';
import React from 'react';
import { PaymentType } from '../..';
import { SuccessIcon } from '../../assets';

interface Props {
  txRef: string;
  title: string;
  bodyContent: string;
  paymentTypeQuery: PaymentType;
  isModulr: string;
}

const resolveBtnLabel = (paymentType: PaymentType) => {
  //   if (paymentType === "recurring") return "Your transfer has been scheduled!";
  if (paymentType === 'gift') return 'Track your gift card purchase';

  return 'Track your transfer';
};

const SuccessBlock = ({ txRef, title, bodyContent, paymentTypeQuery, isModulr }: Props) => {
  const transactionDetailSendMoneyUrl = `${Path.TransferHistory}?txref=${txRef}`;
  const transactionDetailGiftUrl = `${Path.TransferHistory}?txref=${txRef}&type=gift`;

  const transactionUrl =
    paymentTypeQuery === 'gift' ? transactionDetailGiftUrl : transactionDetailSendMoneyUrl;
  return (
    <Box className="ss-shadow ss-max-w-700 ss-mx-auto ss-rounded ss-overflow-hidden">
      <div className="ss-py-8 ss-px-4 ss-text-center ss-bg-neutral-100">
        <Icon svg={SuccessIcon} size={180} />
      </div>
      <Box className="ss-px-4 md:ss-px-10 ss-py-10 ss-max-w-500 ss-mx-auto">
        <Text variant="h5" className="ss-mb-8 ss-text-center">
          {title}
        </Text>
        <Text className="ss-text-center ss-mb-4 ss-text-neutral-40">{bodyContent}</Text>
        <div className="ss-space-y-6">
          <ButtonLink
            label="Okay, got it!"
            isBlock={true}
            variant="primary"
            to={Path.TransferHistory}
          />
          {!isModulr && (
            <ButtonLink
              label={resolveBtnLabel(paymentTypeQuery)}
              isBlock={true}
              variant="tertiary"
              to={transactionUrl}
            />
          )}
        </div>
      </Box>
    </Box>
  );
};

export default SuccessBlock;
