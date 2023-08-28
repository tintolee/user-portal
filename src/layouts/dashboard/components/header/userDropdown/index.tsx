import { Menu } from '@headlessui/react';
import Avatar from '@sendsprint/ui-react/dist/components/Avatar';
import Box from '@sendsprint/ui-react/dist/components/Box';
import { Icon } from '@sendsprint/ui-react/dist/components/Icon';
import Text from '@sendsprint/ui-react/dist/components/Text';
import ArrowIosDownwardOutline from '@sendsprint/ui-react/dist/icons/ArrowIosDownwardOutline';
import ClientApi from '@src/types/client';
import { getInitials } from '@src/utils/user';
import React, { lazy, useState } from 'react';
import cs from 'classnames';
import SuspenseWrapper from '@src/components/suspenseWrapper';

const UserDropdownTransition = lazy(
  () => import(/*webpackChunkName: 'UserDropdownTransition'*/ './UserDropdownTransition')
);

interface Props {
  user: ClientApi.UserProfile | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logoutHandler: () => Promise<any>;
}

const UserDropdown = ({ user, logoutHandler }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Menu as={'div'} className="ss-relative ss-block">
      {({ open }) => (
        <>
          <Menu.Button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cs(
              'ss-flex ss-items-center ss-duration-200 ss-gap-2 ss-p-2 ss-rounded-full focus:ss-focus-ring',
              {
                'ss-bg-success-100': isHovered
              }
            )}>
            <Box className="ss-relative">
              <Avatar
                className="ss-w-8 ss-h-8"
                size={'100%'}
                initials={getInitials(user?.fullName || '')}
              />
            </Box>
            <Text className="ss-sr-only md:ss-not-sr-only ss-hidden lg:ss-inline-block">
              My account
            </Text>
            <Icon
              svg={ArrowIosDownwardOutline}
              size={28}
              className={cs(
                'ss-text-primary-100 lg:ss-inline-block ss-transition ss-transform-gpu',
                {
                  'ss-duration-100 ss-rotate-180': open,
                  'ss-duration-75 ss-rotate-0': !open
                }
              )}
            />
          </Menu.Button>
          {open && (
            <SuspenseWrapper returnNullErrorFallback>
              <UserDropdownTransition logoutHandler={logoutHandler} open={open} />
            </SuspenseWrapper>
          )}
        </>
      )}
    </Menu>
  );
};

export default UserDropdown;
