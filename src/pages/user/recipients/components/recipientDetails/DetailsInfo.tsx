import Api from '@sendsprint/api-types';
import { Box, ButtonLink, Skeleton, Text } from '@sendsprint/ui-react';
import {
  CalendarOutline,
  EmailOutline,
  Gift,
  Money,
  PhoneOutline,
  PinOutline
} from '@sendsprint/ui-react/dist/icons';
import { AvatarWithFlag } from '@src/components';
import { useResolveBanks } from '@src/hooks';
import { Path } from '@src/navigations/routes';
import ClientApi from '@src/types/client';
import React, { useEffect, useState } from 'react';
import { handleResolvePaymentType, resolveRecipientName } from '../../utils';
import InfoBlock from '../recipientInfo/InfoBlock';
import TransferInfo from './TransferInfo';
import ConfirmDeleteModal from './ConfirmDeleteModal';
// import { FiEdit2 } from 'react-icons/fi';

interface Props {
  handleClose: () => void;
  data: ClientApi.Recipient | null | undefined;
  isLoading: boolean;
  handleDeleteRecipient: () => void;
  isDeleteLoading: boolean;
}

const DetailsInfo = ({ data, isLoading, handleDeleteRecipient, isDeleteLoading }: Props) => {
  const [resolvedPaymentType, setResolvedPaymentType] = useState<ClientApi.RecipientType | null>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { areBanksLoading, resolvedBanks, bankBranches } = useResolveBanks({
    branchCode: data?.branchCode || '',
    country: data?.country || ('' as Api.Model.CountryInitials),
    paymentType: resolvedPaymentType
  });

  useEffect(() => {
    if (data) {
      handleResolvePaymentType(data, setResolvedPaymentType);
    }
  }, [data]);

  const sendMoneyUrl = `${Path.SendMoney}?recipientData=${data ? JSON.stringify(data) : ''}`;
  const connectUrl = `${Path.Connect}?recipientData=${data ? JSON.stringify(data) : ''}`;

  return (
    <>
      {isLoading && (
        <Box>
          <Skeleton className="ss-h-5 ss-rounded ss-mb-6 ss-max-w-300" />
          <Box className="ss-flex ss-flex-col ss-gap-4 ss-p-6 ss-bg-success-50 ss-rounded-lg">
            {[...Array(4)].map((_, index) => (
              <Skeleton className="ss-h-28 ss-rounded" key={index} />
            ))}
          </Box>
        </Box>
      )}
      {!isLoading && data && (
        <Box>
          <Box className="ss-p-3 md:ss-p-6 ss-bg-success-50 ss-mb-6 ss-rounded-lg">
            <Box className="ss-flex ss-justify-between ss-items-center ss-mb-6">
              <Box className="ss-flex ss-items-center ss-gap-4">
                <AvatarWithFlag
                  country={
                    (data.country as Api.Model.CountryInitials) || Api.Model.CountryInitials.Nigeria
                  }
                  initials={`${data.firstName[0]}${data.lastName[0]}`}
                />
                <Text variant="paragraphLarge" className="ss-font-bold ss-text-primary1-500">
                  {resolveRecipientName(data)}
                </Text>
              </Box>
              {/* <button
                type="button"
                className="ss-flex ss-items-center ss-gap-1 focus:ss-focus-ring ss-bg-success-400 ss-bg-opacity-30 ss-text-primary1-400 ss-py-1 ss-px-4 ss-rounded-full">
                <FiEdit2 />
                <span>Edit</span>
              </button> */}
            </Box>
            <Box className="ss-flex ss-flex-col ss-gap-4">
              <TransferInfo bankBranches={bankBranches} resolvedBanks={resolvedBanks} data={data} />
              <InfoBlock icon={PhoneOutline} title="Phone Number" value={data.phoneNumber} />
              <InfoBlock icon={EmailOutline} title="Email Address" value={data.email} />
              <InfoBlock icon={CalendarOutline} title="Birthday" value={''} />
              <InfoBlock icon={PinOutline} title="Address" value={data.address} />
            </Box>
          </Box>
          <Box className="ss-flex ss-flex-col ss-gap-4">
            {data.paymentType === Api.Model.PaymentType.GiftCard && (
              <ButtonLink isBlock label="Send a gift" icon={Gift} to={connectUrl} />
            )}
            {data.paymentType !== Api.Model.PaymentType.GiftCard && (
              <ButtonLink isBlock label="Send money" icon={Money} to={sendMoneyUrl} />
            )}
            <ConfirmDeleteModal
              handleDeleteRecipient={handleDeleteRecipient}
              isDeleteLoading={isDeleteLoading}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default DetailsInfo;
