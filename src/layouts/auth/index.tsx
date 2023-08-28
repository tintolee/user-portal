import Box from '@sendsprint/ui-react/dist/components/Box';
import Container from '@src/components/container';
import Meta from '@src/components/meta';
import React, { lazy, ReactNode } from 'react';
import Footer from './components/footer';
import Header from './components/header';
import { HeaderProps } from './components/header';
import cs from 'classnames';
import SuspenseWrapper from '@src/components/suspenseWrapper';
import Loader from '@src/components/loader';

const Aside = lazy(() => import(/*webpackChunkName: 'AuthAside'*/ './components/aside'));

interface Props extends HeaderProps {
  children?: ReactNode;
  pageTitle: string;
  pageDescription?: string;
  showAside?: boolean;
  setContentMaxWidth?: boolean;
  asideContent?: ReactNode;
}

const AuthLayout = ({
  children,
  headerButtonLabel,
  headerButtonLink,
  pageTitle,
  pageDescription,
  showAside = true,
  setContentMaxWidth = true,
  asideContent
}: Props) => {
  return (
    <>
      <Meta pageTitle={pageTitle} pageDescription={pageDescription} />
      <Box className="">
        <Box
          className={cs('ss-min-h-screen ss-flex ss-flex-col ss-gap-5 ss-h-max', {
            'lg:ss-mr-400 xl:ss-mr-140': showAside
          })}
          as="main">
          <Header headerButtonLabel={headerButtonLabel} headerButtonLink={headerButtonLink} />
          <Container className="ss-flex-1">
            <Box
              className={cs('ss-w-full ss-mx-auto ss-pt-3 ss-pb-9 md:ss-py-9', {
                'ss-max-w-600': setContentMaxWidth
              })}>
              {children}
            </Box>
          </Container>
          <Footer showAside={showAside} />
        </Box>
        <Box
          className={cs(
            ' ss-fixed ss-bg-primary1-500 ss-w-400 xl:ss-w-140 ss-h-screen ss-top-0 ss-right-0',
            {
              'ss-hidden lg:ss-block': showAside,
              'ss-hidden': !showAside
            }
          )}>
          {showAside && (
            <SuspenseWrapper
              returnNullErrorFallback
              suspenseFallback={
                <Box className="ss-h-full ss-px-10 ss-flex ss-items-center ss-justify-center">
                  <Loader
                    height="content"
                    ballSize="small"
                    className="ss-py-44 ss-w-full ss-bg-primary1-300 ss-min-h-250 md:ss-min-h-300 ss-rounded-lg"
                  />
                </Box>
              }>
              <Aside asideContent={asideContent} />
            </SuspenseWrapper>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AuthLayout;
