import React, { FC, lazy } from 'react';
import Box from '@sendsprint/ui-react/dist/components/Box';
import Button from '@sendsprint/ui-react/dist/components/Button';
import { Icon } from '@sendsprint/ui-react/dist/components/Icon';
import useId from '@sendsprint/ui-react/dist/hooks/useId';
import phoneNumberImage from './assets/phone-number-modal.png';
import { FormikHelpers } from 'formik';
import { UpdatePhoneNumberData } from '../phoneNumberUpdate';
import Dialog2 from '@src/components/dialog2';
import SuspenseWrapper from '@src/components/suspenseWrapper';
import Loader from '@src/components/loader';
import CloseOutline from '@sendsprint/ui-react/dist/icons/CloseOutline';
import PhoneNumberModalError from './components/PhoneNumberModalError';

const PhoneNumberModalForm = lazy(
  () => import(/*webpackChunkName:'PhoneNumberModalForm'*/ './components/phoneNumberModalForm')
);

interface Props {
  closeFunc: () => void;
  state: boolean;
  handleSubmit: (
    // eslint-disable-next-line no-unused-vars
    values: UpdatePhoneNumberData,
    // eslint-disable-next-line no-unused-vars
    helpers: FormikHelpers<UpdatePhoneNumberData>
  ) => void;
  changePhoneNumber?: () => void;
  phoneUpdateLoading?: boolean;
  verifyStatus?: boolean | null;
  stepsForPhoneUpdate?: 'initial' | 'generated' | 'verified';
}

const PhoneNumberModal: FC<Props> = ({
  closeFunc,
  state,
  handleSubmit,
  stepsForPhoneUpdate,
  changePhoneNumber,
  phoneUpdateLoading,
  verifyStatus
}) => {
  const titleId = useId();

  const handleClose = () => {
    closeFunc();
    sessionStorage.removeItem('UPDATE_PHONE');
  };

  return (
    <>
      <Dialog2
        isOpen={state}
        handleClose={handleClose}
        disableOverlayClick
        aria-labelledby={titleId}>
        <Box className="ss-flex ss-justify-end ss-mb-6 ss-items-center">
          <Button
            onClick={handleClose}
            label={<Icon svg={CloseOutline} size={24} />}
            variant="tertiary"
            className="ss-p-0"
          />
        </Box>
        <div className="ss-text-center ss-bg-neutral-5 ss-flex ss-justify-center ss-py-12">
          <img src={phoneNumberImage} alt="phone" />
        </div>
        <SuspenseWrapper
          suspenseFallback={
            <Loader
              ballSize="small"
              height="content"
              className="ss-bg-white ss-min-h-250 md:ss-min-h-300 ss-rounded-lg"
            />
          }
          errorFallback={PhoneNumberModalError}>
          <PhoneNumberModalForm
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            changePhoneNumber={changePhoneNumber}
            phoneUpdateLoading={phoneUpdateLoading}
            stepsForPhoneUpdate={stepsForPhoneUpdate}
            verifyStatus={verifyStatus}
          />
        </SuspenseWrapper>
      </Dialog2>
    </>
  );
};

export default PhoneNumberModal;
