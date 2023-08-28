import Api from '@sendsprint/api-types';
import { Box, Button, ButtonLink, Text } from '@sendsprint/ui-react';
import {
  CalendarOutline,
  EmailOutline,
  Money,
  PhoneOutline,
  PinOutline
} from '@sendsprint/ui-react/dist/icons';
import { AvatarWithFlag } from '@src/components';
import { Path } from '@src/navigations/routes';
import ClientApi from '@src/types/client';
import { useFormikContext } from 'formik';
import React from 'react';
import { AddRecipientFormI } from '..';
import InfoBlock from '../../recipientInfo/InfoBlock';
import TransferInfo from './TransferInfo';

interface Props {
  resolvedBanks: ClientApi.Bank[];
  bankBranches: ClientApi.BankBranch[];
  handleClose: () => void;
  recipientAdded: ClientApi.Recipient | null | undefined;
}

const SuccessScreen = ({ resolvedBanks, handleClose, bankBranches, recipientAdded }: Props) => {
  const { values } = useFormikContext<AddRecipientFormI>();

  const formattedFirstName = `${values.firstName[0].toUpperCase()}${values.firstName.slice(1)}`;
  const formattedLastName = `${values.lastName[0].toUpperCase()}${values.lastName.slice(1)}`;

  const sendMoneyUrl = recipientAdded
    ? `${Path.SendMoney}?recipientData=${recipientAdded ? JSON.stringify(recipientAdded) : ''}`
    : Path.SendMoney;
  return (
    <Box>
      <Text variant="paragraphLarge" className="text-neutral-400 ss-mb-6">
        {formattedFirstName} has been added as a recipient.
      </Text>
      <Box className="ss-p-6 ss-bg-success-50 ss-mb-6 ss-rounded-lg">
        <Box className="ss-flex ss-items-center ss-gap-4 ss-mb-6">
          <AvatarWithFlag
            country={
              (values.country as Api.Model.CountryInitials) || Api.Model.CountryInitials.Nigeria
            }
            initials={`${values.firstName[0]}${values.lastName[0]}`}
          />
          <Text variant="paragraphLarge" className="ss-font-bold ss-text-primary1-500">
            {formattedFirstName} {formattedLastName}
          </Text>
        </Box>
        <Box className="ss-flex ss-flex-col ss-gap-4">
          <TransferInfo values={values} resolvedBanks={resolvedBanks} bankBranches={bankBranches} />
          <InfoBlock icon={PhoneOutline} title="Phone Number" value={values.phoneNumber} />
          <InfoBlock icon={EmailOutline} title="Email Address" value={values.email} />
          <InfoBlock icon={CalendarOutline} title="Birthday" value={values.birthday} />
          <InfoBlock icon={PinOutline} title="Address" value={values.address} />
        </Box>
      </Box>
      <Box className="ss-flex ss-flex-col ss-gap-4">
        <ButtonLink isBlock label="Send money" icon={Money} to={sendMoneyUrl} />
        <Button isBlock variant="tertiary" onClick={handleClose} label="I'll do this later" />
      </Box>
    </Box>
  );
};

export default SuccessScreen;
