import Box from '@sendsprint/ui-react/dist/components/Box';
import SuspenseWrapper from '@src/components/suspenseWrapper';
import Container from '@src/components/container';
import Meta from '@src/components/meta';
import React, { lazy, ReactNode } from 'react';
import AsideErrorFallback from './components/aside/AsideErrorFallback';
import AsideLoading from './components/aside/AsideLoading';
import { HeaderProps } from './components/header';

const Aside = lazy(() => import(/*webpackChunkName:'DashboardAside'*/ './components/aside'));
const Header = lazy(() => import(/*webpackChunkName:'DashboardHeader'*/ './components/header'));

interface Props extends HeaderProps {
  pageTitle: string;
  children?: ReactNode;
}

const DashboardLayout = ({ pageTitle, children, headerContent }: Props) => {
  return (
    <>
      <Meta pageTitle={pageTitle} />
      <Box style={{ backgroundColor: '#F6F8FA' }} className="ss-min-h-screen ss-pb-6">
        <SuspenseWrapper returnNullErrorFallback>
          <Header headerContent={headerContent} />
        </SuspenseWrapper>
        <Box className="ss-mt-6">
          <Container className="ss-flex ss-gap-8">
            <SuspenseWrapper errorFallback={AsideErrorFallback} suspenseFallback={<AsideLoading />}>
              <Aside />
            </SuspenseWrapper>
            <Box as="main" className="ss-flex-1">
              {children}
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;
