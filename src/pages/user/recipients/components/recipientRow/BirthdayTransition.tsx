import { Transition } from '@headlessui/react';
import { Box, Icon, Text } from '@sendsprint/ui-react';
import { Gift } from '@sendsprint/ui-react/dist/icons';
import React from 'react';
import { Balloons } from '../../icons';

interface Props {
  isBirthdayShown: boolean;
  fullName: string;
}

const BirthdayTransition = ({ isBirthdayShown, fullName }: Props) => {
  return (
    <Transition
      appear={isBirthdayShown}
      show={isBirthdayShown}
      enter="ss-transition-opacity ss-duration-300"
      enterFrom="ss-opacity-0"
      enterTo="ss-opacity-100"
      leave="ss-transition-opacity ss-duration-200"
      leaveFrom="ss-opacity-100"
      leaveTo="ss-opacity-0">
      <Box className="ss-flex ss-gap-3 ss-items-center ss-mt-4">
        <Box className="ss-flex ss-gap-1 ss-flex-1 md:ss-gap-3 ss-py-1 md:ss-py-3 ss-px-2 md:ss-px-5 ss-rounded ss-items-center ss-bg-primary2-50 lg:ss-bg-white">
          <Box className="ss-w-1 ss-h-5 ss-bg-primary2-200" />
          <Icon svg={Gift} className="ss-text-primary2-500" size={24} />
          <Text variant="paragraphSmall" className="md:ss-font-bold ss-relative ss-top-0.5">
            {`${fullName}'s`} birthday is today
          </Text>
        </Box>
        <Box className="ss-cursor-pointer md:ss-hidden ss-block">
          <Icon svg={Balloons} size={24} />
        </Box>
      </Box>
    </Transition>
  );
};

export default BirthdayTransition;
