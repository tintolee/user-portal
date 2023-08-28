import Box from '@sendsprint/ui-react/dist/components/Box';
import { Icon } from '@sendsprint/ui-react/dist/components/Icon';
import Text from '@sendsprint/ui-react/dist/components/Text';
import React from 'react';
import Facebook from '@sendsprint/ui-react/dist/icons/Facebook';
import Instagram from '@sendsprint/ui-react/dist/icons/Instagram';
import Linkedin from '@sendsprint/ui-react/dist/icons/Linkedin';
import Twitter from '@sendsprint/ui-react/dist/icons/Twitter';
import Container from '@src/components/container';
import SocialIcon from './SocialIcon';
import cs from 'classnames';

interface Props {
  showAside: boolean;
}

const Footer = ({ showAside }: Props) => {
  return (
    <Box>
      <Container
        className={cs('ss-py-5 ss-flex ss-flex-col-reverse  md:ss-flex-row ss-items-center ', {
          'ss-justify-between ss-gap-4': showAside,
          'ss-justify-center ss-gap-4 md:ss-gap-30': !showAside
        })}>
        <Text className="ss-text-neutral-400" variant="paragraphSmall">
          © Sprint Technology Solutions - 2023
        </Text>
        <Box className="ss-flex ss-items-center ss-gap-4">
          <SocialIcon to="https://twitter.com/sendsprintapp/">
            <Icon svg={Twitter} />
          </SocialIcon>
          <SocialIcon to="https://www.instagram.com/sendsprintapp/">
            <Icon svg={Instagram} />
          </SocialIcon>
          <SocialIcon to="https://www.facebook.com/sendsprintapp/">
            <Icon svg={Facebook} />
          </SocialIcon>
          <SocialIcon to="https://www.linkedin.com/company/sendsprintapp/">
            <Icon svg={Linkedin} />
          </SocialIcon>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
