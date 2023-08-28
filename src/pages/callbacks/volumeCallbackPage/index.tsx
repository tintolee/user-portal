import React from 'react';
import { Icon, Text } from '@sendsprint/ui-react';
import { CheckmarkCircle2Outline, CloseCircleOutline } from '@sendsprint/ui-react/dist/icons';
import { useSearchParams } from 'react-router-dom';
import { GeneralLayout } from '@src/layouts';

const VolumeCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const statusQuery = searchParams.get('status');
  const amountQuery = searchParams.get('amount');
  const currencyQuery = searchParams.get('currency');

  return (
    <GeneralLayout pageTitle="Payment Callback">
      {statusQuery === 'COMPLETED' && (
        <SuccessScreen amount={amountQuery || ''} currency={currencyQuery || ''} />
      )}
      {statusQuery === 'FAILED' && <FailedScreen />}
    </GeneralLayout>
  );
};

interface SuccessScreenProps {
  currency: string;
  amount: string;
}

const SuccessScreen = ({ amount, currency }: SuccessScreenProps) => {
  return (
    <div className="ss-max-w-500 ss-flex ss-flex-col ss-gap-4 ss-items-center ss-bg-white ss-shadow ss-w-full ss-mx-auto ss-p-5 ss-rounded">
      <Icon
        className="ss-w-24 ss-h-24 ss-text-success-500"
        size="100%"
        svg={CheckmarkCircle2Outline}
      />
      <Text variant="h4" className="ss-text-center">
        Your payment was successful
      </Text>
      <Text className="ss-text-center ss-max-w-500">
        Your transfer of{' '}
        <strong>
          {currency} {amount}
        </strong>{' '}
        has been initiated, it&apos;ll get to them in a few minutes.{' '}
      </Text>
    </div>
  );
};

const FailedScreen = () => {
  return (
    <div className="ss-max-w-500 ss-flex ss-flex-col ss-gap-4 ss-items-center ss-bg-white ss-shadow ss-w-full ss-mx-auto ss-p-5 ss-rounded">
      <Icon className="ss-w-24 ss-h-24 ss-text-error-500" size="100%" svg={CloseCircleOutline} />
      <Text variant="h4" className="ss-text-center">
        Your payment was unsuccessful
      </Text>
      <Text className="ss-text-center ss-max-w-500">
        Sorry, we were unable to process your payment. Please try again or use a different payment
        option.
      </Text>
    </div>
  );
};

export default VolumeCallbackPage;
