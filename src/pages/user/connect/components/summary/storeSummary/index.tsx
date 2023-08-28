import { Box, Text } from '@sendsprint/ui-react';
import { DisplayAmount } from '@src/components';
import EditButton from '@src/components/sendMoneyFlow/components/editButton';
import React, { ReactNode } from 'react';
import GiftItem from './GiftItem';
import { State } from '../../../state';
import { useConnect } from '@src/contexts';
import { getCurrencySymbol } from '@src/utils';
import { getMonetaryValue } from '@src/utils/currency';

interface Props {
  state: State;
  handleEdit?: () => void;
}

const StoreSummary = ({ handleEdit, state }: Props) => {
  const storeState = state.storeFormData;
  const { state: connectState } = useConnect();
  // const amountStepInfo = state.amountFormData;

  const onEdit = () => {
    if (!handleEdit) return;

    handleEdit();
  };

  const formattedRate = getMonetaryValue(connectState.rate?.rate || 0, {
    fractionDigits: 2
  });

  return (
    <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg">
      <Box className="ss-flex ss-items-center ss-justify-between ss-mb-4">
        <Text className="ss-text-neutral-400 ss-font-bold">Store</Text>
        <EditButton label="Edit" onEdit={onEdit} />
      </Box>
      {storeState && (
        <Box>
          {storeState.cart?.map((item, index) => (
            <GiftItem key={index} item={item} />
          ))}
        </Box>
      )}
      <Box className="ss-flex ss-flex-col ss-gap-2 ss-mt-2">
        <InfoRow
          label="Exchange rate"
          value={
            <span>
              <DisplayAmount
                value={1}
                currency={connectState.sender.selectedCountry?.currency || ''}
              />{' '}
              ={' '}
              <DisplayAmount
                value={formattedRate}
                currency={connectState.recipient.selectedCountry?.Currency || ''}
                decimalScale={2}
              />
            </span>
          }
        />
        <InfoRow
          label="Gift(s) total"
          value={
            <span className="ss-font-bold">
              <DisplayAmount
                value={getMonetaryValue(state.storeFormData?.totalAmount || 0)}
                currency={getCurrencySymbol(state.storeFormData?.sender?.initials || '')}
                decimalScale={2}
              />
            </span>
          }
        />
        {state.voucher?.discount && (
          <InfoRow
            label="Discount"
            value={
              <span>
                -
                <DisplayAmount
                  value={getMonetaryValue(state.voucher?.discount || 0)}
                  currency={getCurrencySymbol(state.storeFormData?.sender?.initials || '')}
                  decimalScale={2}
                />
              </span>
            }
          />
        )}
        <InfoRow
          label="Fee"
          value={
            <span>
              +
              <DisplayAmount
                value={getMonetaryValue(state.storeFormData?.fee || 0)}
                currency={getCurrencySymbol(state.storeFormData?.sender?.initials || '')}
                decimalScale={2}
              />
            </span>
          }
        />
        <InfoRow
          label="Total"
          value={
            <span className="ss-font-bold">
              <DisplayAmount
                value={getMonetaryValue(state.storeFormData?.totalAmountPlusFee || 0)}
                currency={getCurrencySymbol(state.storeFormData?.sender?.initials || '')}
                decimalScale={2}
              />
              {/* {total} */}
            </span>
          }
        />
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

export default StoreSummary;
