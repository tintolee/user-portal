import { PaymentTypeBlock } from '@src/components';
import ClientApi from '@src/types/client';
import React from 'react';

interface Props {
  paymentTypesByCountry: ClientApi.PaymentTypeInfo[] | undefined;
  isPaymentTypesLoading: boolean;
}

const PaymentTypes = ({ paymentTypesByCountry = [], isPaymentTypesLoading }: Props) => {
  return (
    <PaymentTypeBlock
      getPaymentTypesLoading={isPaymentTypesLoading}
      paymentTypes={paymentTypesByCountry}
      name="recipientType"
    />
  );
};

export default PaymentTypes;
