import { useEffect } from 'react';
import { useLoadChargeRoute } from '@src/hooks';

export interface PaymentMethodsI {
  Gateway: string;
  Description: string;
  Id: number;
}

interface Props {
  senderInitials: string;
  // eslint-disable-next-line no-unused-vars
  handlePaymentMethods: (paymentMethodData: PaymentMethodsI[]) => void;
}

const GetPaymentMethods = ({ senderInitials, handlePaymentMethods }: Props) => {
  const { data } = useLoadChargeRoute({
    country: senderInitials
  });

  useEffect(() => {
    if (data) {
      const res = data?.Data;

      handlePaymentMethods(res as PaymentMethodsI[]);
    }
  }, [data]);

  return null;
};

export default GetPaymentMethods;
