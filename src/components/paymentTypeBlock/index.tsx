import { Box, ExtraInfo, Skeleton, Text } from '@sendsprint/ui-react';
import { PaymentTypeBox } from '@src/components';
import ClientApi from '@src/types/client';
import { ErrorMessage } from 'formik';
import React from 'react';
import getTextContent from './text-content';

interface Props {
  getPaymentTypesLoading: boolean;
  paymentTypes: ClientApi.PaymentTypeInfo[];
  name: string;
}

const PaymentTypeBlock = ({ getPaymentTypesLoading, paymentTypes, name }: Props) => {
  return (
    <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg ss-my-6">
      <Text className="ss-text-neutral-400 ss-font-bold ss-mb-6">
        How do you want them to receive the money?
      </Text>
      <Box>
        {getPaymentTypesLoading && (
          <Box className="ss-flex ss-flex-col ss-gap-3">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="ss-h-20 ss-rounded-lg" />
            ))}
          </Box>
        )}
        <Box className="ss-flex ss-flex-col ss-gap-3">
          {!getPaymentTypesLoading && paymentTypes && paymentTypes.length
            ? paymentTypes.map((type) => {
                const textContent = getTextContent(type.recipientType);

                if (!textContent) return null;
                return (
                  <PaymentTypeBox
                    key={type.id}
                    description={textContent?.body}
                    name={name}
                    svg={textContent?.icon}
                    title={textContent?.title}
                    value={type.recipientType}
                  />
                );
              })
            : null}
        </Box>
        <ErrorMessage name={name}>
          {(errMessage) => <ExtraInfo variant="error" extraInfo={errMessage} />}
        </ErrorMessage>
      </Box>
    </Box>
  );
};

export default PaymentTypeBlock;
