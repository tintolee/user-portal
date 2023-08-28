import { Box, Icon, Text } from '@sendsprint/ui-react';
import { ChevronRightOutline, PlusCircleOutline } from '@sendsprint/ui-react/dist/icons';
import { AvatarWithFlag } from '@src/components';
import { Balloons } from '@src/components/paymentTypeBlock/icons';
import ClientApi from '@src/types/client';
import React from 'react';
import { RxDotFilled } from 'react-icons/rx';
import cs from 'classnames';
import { useRecipientRow } from '../../hooks';
import BirthdayTransition from './BirthdayTransition';

interface Props {
  recipient: ClientApi.Recipient;
  disableClick?: boolean;
  as?: 'link' | 'button';
  showBirthdayTransition?: boolean;
  iconShown?: 'plus' | 'arrow' | 'none';
  onClick?: () => void;
}

const RecipientRow = ({
  recipient,
  as = 'button',
  disableClick,
  showBirthdayTransition = true,
  iconShown = 'arrow',
  onClick
}: Props) => {
  const { country, firstName, lastName, email, fullName } = recipient;
  const initials = `${firstName[0]?.toUpperCase()}${lastName[0]?.toUpperCase()}`;

  const {
    handleClick,
    isBirthdayToday,
    setIsBirthdayShown,
    isBirthdayShown,
    isDesktop,
    recipientType
  } = useRecipientRow({
    recipient,
    as,
    onClick
  });

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
        <Box className="ss-flex ss-gap-10 ss-items-center">
          {isBirthdayToday && (
            <Box
              className="ss-cursor-pointer ss-hidden md:ss-block"
              onMouseEnter={isDesktop ? () => setIsBirthdayShown(true) : undefined}
              onMouseLeave={isDesktop ? () => setIsBirthdayShown(false) : undefined}>
              <Icon svg={Balloons} size={24} />
            </Box>
          )}
          {iconShown === 'plus' && <Icon size={24} svg={PlusCircleOutline} />}
          {iconShown === 'arrow' && <Icon size={30} svg={ChevronRightOutline} />}
        </Box>
      </Box>
      {showBirthdayTransition && isBirthdayToday && (
        <BirthdayTransition fullName={fullName} isBirthdayShown={isBirthdayShown} />
      )}
    </button>
  );
};

export default RecipientRow;
