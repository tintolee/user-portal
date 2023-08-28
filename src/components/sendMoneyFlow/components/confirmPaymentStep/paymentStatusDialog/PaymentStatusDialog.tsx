import React, { FC } from 'react';
import { ButtonLink, Icon } from '@sendsprint/ui-react';
import ImageDialog, { ImageDialogProps } from '@src/components/imageDialog';
import { ReactComponent as SuccessIcon } from './payment-status-success.svg';
import { ReactComponent as SuccessIcon2 } from './payment-status-success2.svg';
import { Path } from '@src/navigations/routes';
import { Image } from '@src/components';
import { check } from './assets';
import { TransferType } from '../../../../paymentDropdownList/components/processPayment';
import { useQueryClient } from 'react-query';

type PaymentStatusDialogProps = { txRef: string; transferType?: TransferType } & Pick<
  ImageDialogProps,
  'isOpen'
>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PaymentStatusDialog: FC<PaymentStatusDialogProps> = ({ txRef, isOpen, transferType }) => {
  const queryClient = useQueryClient();

  const handleInvalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: ['getTransactions']
    });

    queryClient.invalidateQueries({
      queryKey: ['loadUserRecurringTransactions']
    });
  };

  const title =
    transferType === 'recurring'
      ? 'Your transfer has been scheduled!'
      : transferType === 'gift'
      ? 'Your gift card is on its way!'
      : 'Your transfer is on its way!';

  const bodyContent =
    transferType === 'recurring'
      ? `We'll let you know when the money has been transferred. In the
      meantime, take some time for yourself. We’ve got you covered.`
      : transferType === 'gift'
      ? 'Great news! Your gift card is on its way to your recipient. Please check your inbox for an email confirmation from Sendsprint.'
      : 'Great news! Your transfer is on its way to your recipient. Please check your inbox for an email confirmation from Sendsprint.';

  const imgSrc = transferType === 'recurring' ? check : '';

  const transferPath = transferType === 'recurring' ? Path.TransferSchedule : Path.TransferHistory;

  return (
    <ImageDialog
      isOpen={isOpen}
      showCloseButton={false}
      imageContent={
        transferType === 'recurring' ? (
          <div className="ss-py-8 ss-px-4 ss-bg-neutral-100">
            <Image alt="" imgClasses="ss-w-40 ss-mx-auto" src={imgSrc} />
          </div>
        ) : transferType === 'gift' ? (
          <div className="ss-py-8 ss-px-4 ss-bg-neutral-100">
            <Icon svg={SuccessIcon2} size={180} />
          </div>
        ) : (
          <div className="ss-py-8 ss-px-4 ss-bg-neutral-100">
            <Icon svg={SuccessIcon} size={180} />
          </div>
        )
      }
      title={title}
      bodyContent={bodyContent}
      footerContent={
        <div className="ss-space-y-6">
          <ButtonLink
            onClick={handleInvalidateQuery}
            label="Okay, got it!"
            isBlock={true}
            variant="primary"
            to={transferPath}
          />
        </div>
      }
    />
  );
};

export type { PaymentStatusDialogProps };
export default PaymentStatusDialog;
