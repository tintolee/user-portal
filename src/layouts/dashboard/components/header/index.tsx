import Box from '@sendsprint/ui-react/dist/components/Box';
import Container from '@src/components/container';
import React, { lazy, ReactNode } from 'react';
import { ReactComponent as Logo } from '@sendsprint/design-system/brand/logos/logo-full-green.svg';
import { useAccount } from '@src/contexts/auth-context';
import { useEnv } from '@src/contexts/env-context';
import UserDropdown from './userDropdown';
import cs from 'classnames';
import SuspenseWrapper from '@src/components/suspenseWrapper';

const MobileNavbar = lazy(
  () => import(/*webpackChunkName:'DashboardMobileNavbar'*/ './mobileNavbar')
);

export interface HeaderProps {
  headerContent?: ReactNode;
}

const Header = ({ headerContent }: HeaderProps) => {
  const { logout, user } = useAccount();
  const { WEBSITE_URL } = useEnv();

  const logoutHandler = () => logout();

  return (
    <Box className="ss-sticky ss-z-10 ss-top-0">
      <Container
        style={{
          backgroundColor: '#F6F8FA'
        }}
        className={cs('md:ss-pt-6 md:ss-pb-1 ')}>
        <Box className="ss-flex ss-justify-between ss-items-center md:ss-px-6 ss-py-5 md:ss-bg-white ss-rounded-lg">
          <Box className="ss-flex ss-items-center ss-gap-2">
            <SuspenseWrapper returnNullErrorFallback>
              <MobileNavbar />
            </SuspenseWrapper>
            <a target="_blank" rel="noreferrer" href={WEBSITE_URL}>
              <Logo
                className="ss-h-10 ss-w-32 md:ss-w-40 lg:ss-w-56 md:ss-h-10 ss-hidden md:ss-block"
                role="presentation"
              />
            </a>
          </Box>
          <Box className="ss-flex ss-items-center ss-gap-4">
            {/* <Box className="ss-hidden md:ss-block">
              <Link to={Path.DealsAndRewards} className="focus:ss-focus-ring ss-rounded-full">
                <Text className="ss-bg-neutral-200 ss-flex ss-py-2 ss-px-5 ss-rounded-full">
                  🎁 Deals & Rewards!
                </Text>
              </Link>
            </Box> */}
            <Box>
              <Box className="ss-block md:ss-hidden">{headerContent}</Box>
              <UserDropdown user={user} logoutHandler={logoutHandler} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
