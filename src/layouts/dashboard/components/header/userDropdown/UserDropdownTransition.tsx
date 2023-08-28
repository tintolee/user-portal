import { Menu, Transition } from '@headlessui/react';
import { Icon } from '@sendsprint/ui-react/dist/components/Icon';
import Text from '@sendsprint/ui-react/dist/components/Text';
import GiftOutline from '@sendsprint/ui-react/dist/icons/GiftOutline';
import LogOutOutline from '@sendsprint/ui-react/dist/icons/LogOutOutline';
import PersonOutline from '@sendsprint/ui-react/dist/icons/PersonOutline';
import React from 'react';
import cs from 'classnames';
import { Path } from '@src/navigations/routes';
import DropdownItem from './DropdownItem';
import { useMedia } from '@src/hooks/utils/useMedia';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logoutHandler: () => Promise<any>;
  open: boolean;
}

const dropdownData = [
  { icon: PersonOutline, label: 'My details', linkPath: Path.Profile },
  { icon: GiftOutline, label: 'Invite Friends', linkPath: Path.Referrals }
];

const dropdownData2 = [
  { icon: PersonOutline, label: 'My details', linkPath: Path.Profile },
  { icon: GiftOutline, label: 'Invite Friends', linkPath: Path.Referrals }
  // { icon: ShoppingBagOutline, label: 'Deals and Rewards', linkPath: Path.DealsAndRewards }
];

const UserDropdownTransition = ({ logoutHandler, open }: Props) => {
  const { isMobile } = useMedia();

  const shownData = isMobile ? dropdownData2 : dropdownData;

  const getMenuItemClasses = (active: boolean): string => {
    return cs(
      'ss-block ss-w-full ss-text-left ss-px-6 ss-py-2 ss-border-none ss-flex ss-items-center focus:ss-focus-ring',
      { 'ss-bg-neutral-200': active, 'ss-bg-transparent': !active }
    );
  };

  const getMenuItemIconClasses = (extraClasses = ''): string =>
    cs('ss-block ss-p-1 ss-rounded-full ss-bg-neutral-100 ss-mr-4', extraClasses);

  return (
    <Transition
      show={open}
      enter="ss-transition ss-duration-100 ss-ease-out"
      enterFrom="ss-transform ss-scale-95 ss-opacity-0"
      enterTo="ss-transform ss-scale-100 ss-opacity-100"
      leave="ss-transition ss-duration-75 ss-ease-out"
      leaveFrom="ss-transform ss-scale-100 ss-opacity-100"
      leaveTo="ss-transform ss-scale-95 ss-opacity-0">
      <Menu.Items
        static
        as="ul"
        className="ss-absolute ss-right-0 ss-w-60 ss-p-0 ss-py-2 ss-m-0 ss-mt-2 ss-overflow-hidden ss-bg-white ss-rounded ss-shadow ss-top-full focus:ss-outline-none">
        {shownData.map((item) => (
          <DropdownItem
            key={item.label}
            getMenuItemClasses={getMenuItemClasses}
            getMenuItemIconClasses={getMenuItemIconClasses}
            icon={item.icon}
            label={item.label}
            linkPath={item.linkPath}
          />
        ))}
        <Menu.Item as="li" className="ss-m-0">
          {({ active }) => {
            return (
              <button className={getMenuItemClasses(active)} type="button" onClick={logoutHandler}>
                <Icon
                  className={getMenuItemIconClasses('ss-text-error-500')}
                  svg={LogOutOutline}
                  size={16}
                />
                <Text className="ss-text-error-500">Logout</Text>
              </button>
            );
          }}
        </Menu.Item>
      </Menu.Items>
    </Transition>
  );
};

export default UserDropdownTransition;
