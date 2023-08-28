import Box from '@sendsprint/ui-react/dist/components/Box';
import { ButtonLink } from '@sendsprint/ui-react/dist/components/Button';
import Container from '@src/components/container';
import React from 'react';
import { ReactComponent as Logo } from '@sendsprint/design-system/brand/logos/logo-full-green.svg';
import { useMedia } from '@src/hooks/utils/useMedia';
import cs from 'classnames';
import { useEnv } from '@src/contexts/env-context';

export interface HeaderProps {
  headerButtonLabel?: string;
  headerButtonLink?: string;
}

const Header = ({ headerButtonLabel, headerButtonLink }: HeaderProps) => {
  const { isMobile } = useMedia();
  const { WEBSITE_URL } = useEnv();

  const showBtn = headerButtonLabel || headerButtonLink;
  return (
    <Box as="header">
      <Container className="ss-py-5 ss-flex ss-items-center ss-justify-between">
        <Box>
          <a target="_blank" rel="noreferrer" href={WEBSITE_URL}>
            <Logo className="ss-h-10 ss-w-32 md:ss-w-56 md:ss-h-10" role="presentation" />
          </a>
        </Box>
        {showBtn && (
          <Box>
            <ButtonLink
              label={headerButtonLabel}
              size={isMobile ? 'small' : 'normal'}
              variant="secondary"
              className={cs('ss-px-12', {
                'ss-px-6': isMobile
              })}
              to={headerButtonLink || ''}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Header;
