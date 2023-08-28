/* eslint-disable no-unused-vars */
import { Box, Button, ExtraInfo, Icon, Text } from '@sendsprint/ui-react';
import { CloseCircleOutline } from '@sendsprint/ui-react/dist/icons';
import { useLoadVoucher } from '@src/hooks';
import { getMonetaryValue } from '@src/utils/currency';
import React, { useEffect, useState } from 'react';
import { ChooseAmountFormData } from '../../amountStep';

export interface VoucherDataI {
  code?: string;
  discount?: number;
  percentage?: number;
  newFee?: number;
}

interface Props {
  amountFormData: ChooseAmountFormData;
  voucherData: VoucherDataI | undefined;
  loadVoucherSuccessHandler: (voucher: VoucherDataI) => void;
}

interface HandleCalculationOptions {
  amountFormData: ChooseAmountFormData;
  percentage?: number;
  code?: string;
  setError: (value: React.SetStateAction<string>) => void;
  loadVoucherSuccessHandler: (voucher: VoucherDataI) => void;
}

const handleCalculation = ({
  amountFormData,
  loadVoucherSuccessHandler,
  code,
  percentage,
  setError
}: HandleCalculationOptions) => {
  const percentageVal = (percentage || 0) as number;
  const deductedFee = getMonetaryValue((percentageVal / 100) * amountFormData.rate.fee);
  const newDiscountedAmount =
    deductedFee > 0
      ? getMonetaryValue(amountFormData.rate.fee - deductedFee)
      : amountFormData.rate.fee;

  loadVoucherSuccessHandler({
    code: code || '',
    discount: deductedFee,
    newFee: newDiscountedAmount,
    percentage
  });
  setError('');
};

const VoucherSection = ({ loadVoucherSuccessHandler, amountFormData, voucherData }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFormShown, setIsFormShown] = useState(true);
  const [voucher, setVoucher] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [error, setError] = useState('');

  const { isFetching: isLoading } = useLoadVoucher(
    {
      voucher
    },
    {
      enabled: isEnabled,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (data: any) => {
        setIsEnabled(false);

        if (!data?.Data && data?.ResponseCode === '03') {
          setError('Invalid Voucher');
          loadVoucherSuccessHandler({
            code: '',
            discount: undefined,
            newFee: undefined,
            percentage: undefined
          });
          return;
        }

        const value = data?.Data[0];

        handleCalculation({
          amountFormData,
          loadVoucherSuccessHandler,
          setError,
          code: value?.Code,
          percentage: value?.Percentage
        });
      }
    }
  );

  useEffect(() => {
    if (amountFormData?.sendCountry && voucherData?.code && voucherData?.percentage) {
      handleCalculation({
        amountFormData,
        loadVoucherSuccessHandler,
        setError,
        code: voucherData?.code,
        percentage: voucherData?.percentage
      });
    }
  }, [amountFormData?.sendCountry, voucherData?.code, voucherData?.percentage]);

  const handleCloseForm = () => {
    setIsFormShown(true);

    setVoucher('');
    setError('');
    loadVoucherSuccessHandler({
      code: '',
      discount: undefined,
      newFee: undefined,
      percentage: undefined
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoucher(e.target.value);
    setError('');
    setIsEnabled(false);
  };

  const handleLoadVoucher = (e: React.FormEvent) => {
    e.preventDefault();

    if (!voucher) {
      setError('Please enter voucher');
      return;
    }

    setIsEnabled(true);
  };
  return (
    <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg">
      <Text className="ss-text-neutral-400 ss-font-bold ss-mb-4">Got a voucher code?</Text>
      <Box>
        <Box as="form" onSubmit={handleLoadVoucher} className="ss-space-y-4">
          <Box className="ss-flex-1 ss-relative">
            {voucherData && voucherData?.discount && (
              <Box className="ss-flex ss-justify-end ss-mb-2">
                <button
                  type="button"
                  title="Cancel voucher"
                  onClick={handleCloseForm}
                  className="ss-outline-none ss-flex ss-items-center ss-gap-1 focus:ss-focus-ring ss-rounded-lg ss-text-paragraph-small">
                  <span className="ss-relative ss-top-0.5">Cancel voucher</span>
                </button>
              </Box>
            )}
            <div className="ss-relative">
              {(voucher || voucherData?.code) && (
                <button
                  type="button"
                  title="Cancel voucher"
                  onClick={handleCloseForm}
                  className="ss-absolute ss-outline-none ss-left-2 ss-top-2/4 ss-transform ss--translate-y-2/4 ss-w-6 ss-h-6 ss-rounded-full focus:ss-focus-ring ss-flex ss-items-center ss-justify-center">
                  <Icon size={'100%'} svg={CloseCircleOutline} />
                </button>
              )}

              <input
                name="voucher"
                placeholder="Enter voucher code"
                onChange={handleChange}
                className="ss-field ss-pl-10"
                value={voucher || voucherData?.code}
              />
            </div>
            {error && (
              <Box>
                <ExtraInfo variant="error" extraInfo={error} />
              </Box>
            )}
          </Box>
          {voucherData?.discount && (
            <ExtraInfo
              extraInfo={`You are getting a discount of ${voucherData?.discount}
            ${amountFormData.sendCurrency}`}
            />
          )}
          <Button
            disabled={isLoading}
            showSpinner={isLoading}
            type="submit"
            isBlock
            variant="tertiary"
            className="ss-px-10"
            label="Apply"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default VoucherSection;
