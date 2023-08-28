import { Box, Button } from '@sendsprint/ui-react';
import React from 'react';
import { PaymentMethodI, resolveTxRef, SortedDataI } from '.';
import { FlutterwaveDropdown, ModulrDropdown, VolumeDropdown, WirefxDropdown } from './components';

interface Props {
  sortedData: SortedDataI[];
  currency: string;
  handleOtherPaymentMethods: () => void;
  // eslint-disable-next-line no-unused-vars
  handleToggle: (id: number) => void;
  isNethoneCheck: boolean;
  isSubmitting: boolean;
  selectedPaymentMethod: PaymentMethodI | null;
  value: number;
  markPageAsClean: () => void;
  transferType: string;
  onSuccess?: () => void;
  showVolumeModal: boolean;
  handleModalClose: () => void;
  handleModalOpen: () => void;
  txRef?: string;
  modulrURL?: string;
  onCancelBtnClickHandler: () => void;
}

const PaymentDropdownListInner = ({
  sortedData,
  currency,
  handleOtherPaymentMethods,
  handleToggle,
  isNethoneCheck,
  isSubmitting,
  selectedPaymentMethod,
  value,
  markPageAsClean,
  transferType,
  onSuccess,
  showVolumeModal,
  handleModalClose,
  handleModalOpen,
  txRef,
  modulrURL,
  onCancelBtnClickHandler
}: Props) => {
  return (
    <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-space-y-2 ss-rounded-lg">
      {sortedData &&
        sortedData?.map((item) => {
          if (item.Gateway === 'VolumePay') {
            return (
              <VolumeDropdown
                key={item.Id}
                currency={currency}
                handleOtherPaymentMethods={handleOtherPaymentMethods}
                handlePayment={item.handleSubmit}
                handleToggle={() => handleToggle(item.Id)}
                isNethoneCheck={isNethoneCheck}
                isOpen={item.isOpen}
                isSubmitting={isSubmitting}
                txRef={resolveTxRef(selectedPaymentMethod, 'volume', txRef)}
                value={value}
                markPageAsClean={markPageAsClean}
                transferType={transferType}
                onSuccess={onSuccess}
                showVolumeModal={showVolumeModal}
                handleModalClose={handleModalClose}
                handleModalOpen={handleModalOpen}
              />
            );
          }

          if (item.Gateway === 'Modulr') {
            return (
              <ModulrDropdown
                key={item.Id}
                currency={currency}
                handlePayment={item.handleSubmit}
                handleToggle={() => handleToggle(item.Id)}
                isNethoneCheck={isNethoneCheck}
                isOpen={item.isOpen}
                isSubmitting={isSubmitting}
                txRef={resolveTxRef(selectedPaymentMethod, 'modulr', txRef)}
                value={value}
                description={item.Description}
                modulrURL={modulrURL}
              />
            );
          }

          if (item.Gateway === 'Flutterwave') {
            return (
              <FlutterwaveDropdown
                key={item.Id}
                currency={currency}
                handlePayment={item.handleSubmit}
                handleToggle={() => handleToggle(item.Id)}
                isNethoneCheck={isNethoneCheck}
                isOpen={item.isOpen}
                isSubmitting={isSubmitting}
                txRef={resolveTxRef(selectedPaymentMethod, 'flutterwave', txRef)}
                value={value}
              />
            );
          }

          if (item.Gateway === 'WireFX') {
            return (
              <WirefxDropdown
                key={item.Id}
                currency={currency}
                handlePayment={item.handleSubmit}
                handleToggle={() => handleToggle(item.Id)}
                isNethoneCheck={isNethoneCheck}
                isOpen={item.isOpen}
                isSubmitting={isSubmitting}
                txRef={resolveTxRef(selectedPaymentMethod, 'wirefx', txRef)}
                description={item.Description}
                value={value}
                markPageAsClean={markPageAsClean}
              />
            );
          }

          return null;
        })}

      <Button
        type="button"
        isBlock={true}
        label="Cancel transfer"
        variant="tertiary"
        disabled={isSubmitting}
        onClick={onCancelBtnClickHandler}
      />
    </Box>
  );
};

export default PaymentDropdownListInner;
