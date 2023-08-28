// import { Transition } from '@headlessui/react';
import { Box, Icon, Text } from '@sendsprint/ui-react';
import { PlusCircleOutline } from '@sendsprint/ui-react/dist/icons';
import { AvatarWithFlag } from '@src/components';
import { useMedia } from '@src/hooks';
// import { Balloons } from '@src/pages/recipients/icons';
import ClientApi from '@src/types/client';
import { getRecipientTypeFromMapping, RecipientTypeOptions } from '@src/utils/recipient-type';
import React, { useEffect, useState } from 'react';
import { RxDotFilled } from 'react-icons/rx';
import { useSearchParams } from 'react-router-dom';
import cs from 'classnames';
import Api from '@sendsprint/api-types';

interface Props {
  recipient: ClientApi.Recipient;
  disableClick?: boolean;
  onSelectRecipient?: (recipient: ClientApi.Recipient, fromForm: boolean) => void;
}

const resolvePaymentType = (options: RecipientTypeOptions) => {
  const recipientType = getRecipientTypeFromMapping(options);
  const { paymentType } = options;

  if (recipientType === 'NG-DOM') return 'Domiciliary USD Account';
  if (recipientType === 'NG-CASH') return 'USD Cash Pickup';
  if (recipientType === 'NG-V-DOM') return '';
  if (recipientType === 'NEW-NG-BANK') return 'Bank Account';
  if (recipientType === 'NG-A-DOM') return 'Virtual Domiciliary USD Account';
  if (recipientType === 'GH-BANK') return 'Bank Account';
  if (recipientType === 'GH-MOBILE') return 'Mobile Money Account';
  if (recipientType === 'KE-BANK') return 'Bank Account';
  if (recipientType === 'KE-MOBILE') return 'Mpesa Mobile Money Account';
  if (recipientType === 'ZA-BANK') return 'Bank Account';

  if (paymentType === Api.Model.PaymentType.GiftCard) return 'Gift';
};

const RecipientRow = ({ recipient, onSelectRecipient, disableClick }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isBirthdayShown, setIsBirthdayShown] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();

  const { isDesktop } = useMedia();

  const { country, firstName, lastName, email, paymentType } = recipient;
  const initials = `${firstName[0]?.toUpperCase()}${lastName[0]?.toUpperCase()}`;

  const recipientType = resolvePaymentType({ country, paymentType });

  useEffect(() => {
    if (isDesktop) {
      setIsBirthdayShown(false);
    } else {
      setIsBirthdayShown(true);
    }
  }, [isDesktop]);

  const handleClick = () => {
    if (onSelectRecipient) {
      onSelectRecipient(recipient, false);
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      disabled={disableClick}
      className={cs(
        'ss-p-2 ss-block ss-w-full focus:ss-focus-ring md:ss-p-4 ss-rounded-lg hover:ss-bg-success-100',
        {
          'ss-cursor-default hover:ss-bg-transparent': disableClick,
          'hover:ss-bg-success-100': !disableClick
        }
      )}>
      <Box className="ss-flex ss-items-center ss-justify-between ss-gap-4">
        <Box>
          <AvatarWithFlag country={country} initials={initials} />
        </Box>
        <Box className="ss-flex-1">
          <Text className="ss-font-bold ss-text-left ss-text-neutral-500">
            {firstName} {lastName}
          </Text>
          <Text
            className="ss-text-neutral-500 ss-text-left ss-flex ss-flex-col md:ss-flex-row ss-items-start md:ss-items-center ss-flex-wrap"
            variant="paragraphSmall">
            {recipientType}{' '}
            {email && (
              <>
                <RxDotFilled className="ss-hidden md:ss-block" />{' '}
                <span className="ss-break-all ss-text-left">{email}</span>{' '}
              </>
            )}
          </Text>
        </Box>
        {!disableClick && (
          <Box className="ss-flex ss-gap-10 ss-items-center">
            <Icon size={24} svg={PlusCircleOutline} />
          </Box>
        )}
      </Box>
    </button>
  );
};

export default RecipientRow;
