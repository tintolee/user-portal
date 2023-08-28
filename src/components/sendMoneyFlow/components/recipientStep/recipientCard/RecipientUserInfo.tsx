import React, { FC, ReactNode } from 'react';
import cs from 'classnames';
import { Avatar, Text } from '@sendsprint/ui-react';
import { getInitials } from '@src/utils/user';

type RecipientUserInfoProps = {
  fullName: string;
  subtitle?: ReactNode;
  className?: string;
};

const RecipientUserInfo: FC<RecipientUserInfoProps> = ({ className, fullName, subtitle }) => {
  const rootClasses = cs('ss-flex', className);

  return (
    <div className={rootClasses}>
      <div>
        <Avatar size={40} initials={getInitials(fullName)} className="ss-flex-shrink-0" />
      </div>
      <div className="ss-ml-4 ss-flex-grow ss-flex ss-flex-col ss-justify-center">
        <Text className="ss-text-neutral-80 ss-font-bold">{fullName}</Text>
        {subtitle && (
          <Text variant="paragraphSmall" className="ss-text-neutral-40">
            {subtitle}
          </Text>
        )}
      </div>
    </div>
  );
};

RecipientUserInfo.defaultProps = {
  fullName: '',
  subtitle: '',
  className: ''
};

export type { RecipientUserInfoProps };
export default RecipientUserInfo;
