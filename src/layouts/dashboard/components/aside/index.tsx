import React from 'react';
import Box from '@sendsprint/ui-react/dist/components/Box';
import Money from '@sendsprint/ui-react/dist/icons/Money';
import HomeOutline from '@sendsprint/ui-react/dist/icons/HomeOutline';
import { useAppLocation } from '@src/hooks/utils/useAppLocation';
import { Path } from '@src/navigations/routes';
import LinkItem, { LinkItemProps } from './LinkItem';
import CalendarOutline from '@sendsprint/ui-react/dist/icons/CalendarOutline';
import Gift from '@sendsprint/ui-react/dist/icons/Gift';
import { TbCash } from 'react-icons/tb';
import { FiUsers } from 'react-icons/fi';

export const linkData: Omit<LinkItemProps, 'active'>[] = [
  {
    icon: HomeOutline,
    label: 'Home',
    to: Path.Dashboard
  },
  {
    icon: Money,
    label: 'Send Money',
    to: Path.SendMoney
  },
  {
    icon: CalendarOutline,
    label: 'Schedule Transfer',
    to: Path.TransferSchedule
  },
  {
    icon: TbCash,
    label: 'Transactions',
    to: Path.TransferHistory,
    isReactIcon: true
  },
  {
    icon: FiUsers,
    label: 'Recipients',
    to: Path.Recipients,
    isReactIcon: true
  },
  {
    icon: Gift,
    label: 'Send a Gift',
    to: Path.Connect
  }
  // {
  //   icon: Money,
  //   label: 'Cards',
  //   to: Path.Cards
  // }
];

export const getActiveLink = (link: string, pathname: string) => {
  return pathname.includes(link);
};

const Aside = () => {
  const location = useAppLocation();
  return (
    <Box
      as="aside"
      className="ss-w-max ss-h-max ss-hidden lg:ss-block lg:ss-w-250 xl:ss-w-300 ss-sticky ss-top-34 ss-bg-white ss-py-8 ss-px-5 ss-rounded-lg">
      <Box className="ss-flex ss-flex-col ss-gap-2">
        {linkData.map((item) => (
          <LinkItem key={item.label} active={getActiveLink(item.to, location.pathname)} {...item} />
        ))}
      </Box>
    </Box>
  );
};

export default Aside;
