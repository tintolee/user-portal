import { Box, ExtraInfo, Text } from '@sendsprint/ui-react';
import { DisplayAmount } from '@src/components';
import React, { ReactNode } from 'react';
import { State } from '../../state/types';
import EditButton from '../editButton';

interface Props {
  state: State;
  handleEdit?: () => void;
}

const TransferInformation = ({ state, handleEdit }: Props) => {
  const amountStepInfo = state.amountFormData;
  const isAmountStep = state.currentIndex === state.stepsIndexMap.amount;
  const voucher = state.voucher;

  const onEdit = () => {
    if (!handleEdit) return;

    handleEdit();
  };

  return (
    <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg">
      <Box className="ss-flex ss-items-center ss-justify-between ss-mb-4">
        <Text className="ss-text-neutral-400 ss-font-bold">Transfer Information</Text>
        {!isAmountStep && <EditButton label="Edit" onEdit={onEdit} />}
      </Box>
      <InfoRow label="Transfer time" value="Less than 30 minutes" />
      <ExtraInfo extraInfo="Our transfers typically get to your recipient in minutes. However, transfers made during the weekend & holidays may take a little longer to reach them." />
      <Box className="ss-flex ss-flex-col ss-gap-2 ss-mt-2">
        {amountStepInfo?.receiveCountry && amountStepInfo?.sendCountry && (
          <InfoRow
            label="Exchange rate"
            value={
              <span>
                <DisplayAmount value={1} currency={amountStepInfo.sendCurrency} /> ={' '}
                <DisplayAmount
                  value={amountStepInfo.rate.rate}
                  currency={amountStepInfo.receiveCurrency}
                  decimalScale={2}
                />
              </span>
            }
          />
        )}
        {amountStepInfo?.sendCountry && amountStepInfo?.sendAmount && (
          <InfoRow
            label="What you're sending"
            value={
              <span className="ss-font-bold">
                <DisplayAmount
                  value={amountStepInfo?.sendAmount}
                  currency={amountStepInfo?.sendCurrency}
                  decimalScale={2}
                />
              </span>
            }
          />
        )}
        {voucher?.discount && amountStepInfo?.sendCurrency && (
          <InfoRow
            label="Discount"
            value={
              <span className="ss-font-bold">
                -
                <DisplayAmount
                  value={voucher.discount}
                  currency={amountStepInfo?.sendCurrency}
                  decimalScale={2}
                />
              </span>
            }
          />
        )}
        {amountStepInfo?.sendCurrency && amountStepInfo?.rate.fee && (
          <InfoRow
            label="Fee"
            value={
              <span className="ss-font-bold">
                +
                <DisplayAmount
                  value={amountStepInfo?.rate.fee}
                  currency={amountStepInfo?.sendCurrency}
                  decimalScale={2}
                />
              </span>
            }
          />
        )}
        {amountStepInfo?.receiveAmount && (
          <InfoRow
            label="What they get"
            value={
              <span className="ss-font-bold">
                <DisplayAmount
                  value={amountStepInfo?.receiveAmount}
                  currency={amountStepInfo?.receiveCurrency}
                  decimalScale={2}
                />
              </span>
            }
          />
        )}
        {amountStepInfo?.totalAmount && (
          <InfoRow
            label="Total"
            value={
              <span className="ss-font-bold">
                <DisplayAmount
                  value={amountStepInfo?.totalAmount}
                  currency={amountStepInfo?.sendCurrency}
                  decimalScale={2}
                />
              </span>
            }
          />
        )}
      </Box>
    </Box>
  );
};

interface InfoRowProps {
  label: string;
  value: ReactNode;
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <Box className="ss-flex ss-gap-5 ss-items-center ss-justify-between">
      <Text variant="paragraphSmall">{label}</Text>
      <Text variant="paragraphSmall">{value}</Text>
    </Box>
  );
};

export default TransferInformation;
