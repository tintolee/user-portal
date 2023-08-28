import Text from '@sendsprint/ui-react/dist/components/Text';
import { Icon } from '@sendsprint/ui-react/dist/components/Icon';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cs from 'classnames';

export interface LinkItemProps {
  to: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  active: boolean;
  isReactIcon?: boolean;
}

const LinkItem = ({ icon, label, to, active, isReactIcon }: LinkItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const Icon2 = icon;
  return (
    <Link
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      to={to}
      className={cs(
        'ss-flex ss-items-center ss-duration-200 focus:ss-focus-ring ss-gap-2 ss-py-3 ss-px-4 ss-rounded-full',
        {
          'ss-bg-success-100': isHovered || active
        }
      )}>
      {isReactIcon ? (
        <Icon2
          // size={24}
          className={cs('ss-w-6 ss-h-6', {
            'ss-text-neutral-400': !isHovered,
            'ss-text-primary1-500': isHovered
          })}
        />
      ) : (
        <Icon
          svg={icon}
          size={24}
          className={cs({
            'ss-text-neutral-400': !isHovered,
            'ss-text-primary1-500': isHovered
          })}
        />
      )}
      <Text
        className={cs('ss-font-bold ss-inline-block md:ss-inline-block lg:ss-inline-block', {
          'ss-text-neutral-400': !isHovered,
          'ss-text-primary1-500': isHovered
        })}>
        {label}
      </Text>
    </Link>
  );
};

export default LinkItem;
