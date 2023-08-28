import Api from '@sendsprint/api-types';
import React from 'react';
import cs from 'classnames';
import { Box, Icon, Text } from '@sendsprint/ui-react';
import {
  getGeneralStatus,
  getStatusIconSvg,
  getStatusName
} from '@src/pages/user/transactions/utils';

interface Props {
  status: Api.Model.TransactionStatus;
}

const displayedStatus = (status: Api.Model.TransactionStatus) =>
  getStatusName(getGeneralStatus(status));

const getTransactionIcon = (status: Api.Model.TransactionStatus) =>
  getStatusIconSvg(getGeneralStatus(status));

const StatusBox = ({ status }: Props) => {
  const resolvedStatus = getGeneralStatus(status);
  const classes = cs('ss-p-2 ss-flex ss-items-center ss-gap-2  ss-rounded-full', {
    'ss-bg-success-50 ss-text-success-500': resolvedStatus === 'successful',
    'ss-bg-warning-50 ss-text-warning-500':
      resolvedStatus === 'pending' || resolvedStatus === 'processing',
    'ss-bg-error-50 ss-text-error-500': resolvedStatus === 'failed'
  });
  return (
    <Box className={classes}>
      <Icon size={20} className="" svg={getTransactionIcon(status)} />
      <Text style={{ top: '1px' }} className="ss-relative">
        {displayedStatus(status)}
      </Text>
    </Box>
  );
};

export default StatusBox;
