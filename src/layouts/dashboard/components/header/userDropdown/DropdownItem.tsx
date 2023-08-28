import { Menu } from '@headlessui/react';
import { Icon } from '@sendsprint/ui-react/dist/components/Icon';
import Text from '@sendsprint/ui-react/dist/components/Text';
import { Link } from 'react-router-dom';

interface DropdownItemProps {
  // eslint-disable-next-line no-unused-vars
  getMenuItemClasses: (active: boolean) => string;
  // eslint-disable-next-line no-unused-vars
  getMenuItemIconClasses: (extraClasses?: string) => string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  linkPath: string;
}

const DropdownItem = ({
  getMenuItemClasses,
  getMenuItemIconClasses,
  icon,
  label,
  linkPath
}: DropdownItemProps) => {
  return (
    <Menu.Item as="li" className="ss-m-0">
      {({ active }) => {
        return (
          <Link className={getMenuItemClasses(active)} to={linkPath}>
            <Icon className={getMenuItemIconClasses('ss-text-primary-100')} svg={icon} size={16} />
            <Text className="ss-text-neutral-60">{label}</Text>
          </Link>
        );
      }}
    </Menu.Item>
  );
};

export default DropdownItem;
