import Api from '@sendsprint/api-types';
import { IconProps } from '@sendsprint/ui-react';
import { FailedIcon, PendingIcon, SuccessIcon } from '../assets';

type GeneralStatus = 'successful' | 'pending' | 'failed' | 'processing';

export const getGeneralStatus = (status: Api.Model.TransactionStatus): GeneralStatus => {
  switch (status) {
    case Api.Model.TransactionStatus.Completed:
    case Api.Model.TransactionStatus.Disbursed:
      return 'successful';
    case Api.Model.TransactionStatus.FailedCharge:
    case Api.Model.TransactionStatus.FailedDisburse:
    case Api.Model.TransactionStatus.Chargeback:
    case Api.Model.TransactionStatus.Reversed:
      return 'failed';
    case Api.Model.TransactionStatus.Confirming:
    case Api.Model.TransactionStatus.Processing:
      return 'processing';
    default:
      return 'pending';
  }
};

/** Get the corresponding icon to the general status */
export const getStatusIconSvg = (generalStatus: GeneralStatus): IconProps['svg'] => {
  switch (generalStatus) {
    case 'successful':
      return SuccessIcon;
    case 'failed':
      return FailedIcon;
    default:
      return PendingIcon;
  }
};

/** Get the corresponding name/label to the general status */
export const getStatusName = (generalStatus: GeneralStatus): string => {
  switch (generalStatus) {
    case 'successful':
      return 'Delivered';
    case 'failed':
      return 'Failed';
    case 'processing':
      return 'Processing';
    default:
      return 'Pending';
  }
};
