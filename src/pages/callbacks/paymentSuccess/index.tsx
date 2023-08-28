import React from 'react';
import SuccessBlock from './components/successBlock';
import { useSearchParams } from 'react-router-dom';
import { GeneralLayout } from '@src/layouts';

export type PaymentType = 'recurring' | 'gift' | 'wirefx' | null;

const resolveTitle = (paymentType: PaymentType) => {
  if (paymentType === 'recurring') return 'Your transfer has been scheduled!';
  if (paymentType === 'gift') return 'Your gift card is on its way!';
  if (paymentType === 'wirefx') return 'Your transaction has been submitted';

  return 'Your transfer is on its way!';
};

const resolveBodyContent = (paymentType: PaymentType) => {
  if (paymentType === 'recurring')
    return `We’ll let you know when the money has been transferred. In the
  meantime, take some time for yourself. We’ve got you covered.
`;
  if (paymentType === 'gift')
    return 'Great news! Your gift card is on its way to your recipient. Please check your inbox for an email confirmation from Sendsprint.';

  if (paymentType === 'wirefx')
    return 'Your transaction has been initiated and you’ll be notified when approved';

  return `Great news! Your transfer is on its way to your recipient.
    Please check your inbox for an email confirmation from Sendsprint.`;
};

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const txRef = searchParams.get('txRef') || '';
  const isModulr = searchParams.get('isModulr') || '';
  const paymentTypeQuery = searchParams.get('paymentType') as PaymentType;

  const title = resolveTitle(paymentTypeQuery);
  const bodyContent = resolveBodyContent(paymentTypeQuery);

  return (
    <GeneralLayout pageTitle="Payment Success">
      <SuccessBlock
        bodyContent={bodyContent}
        title={title}
        txRef={txRef}
        paymentTypeQuery={paymentTypeQuery}
        isModulr={isModulr}
      />
    </GeneralLayout>
  );
};

export default PaymentSuccess;
