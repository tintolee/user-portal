import { Text } from '@sendsprint/ui-react';
import React, { FC, ReactNode } from 'react';
import cs from 'classnames';

type ExpandedItemProps = {
  isSelectable: boolean;
  title: ReactNode;
  children?: ReactNode;
};

const ExpandedItem: FC<ExpandedItemProps> = ({ children, isSelectable, title }) => {
  const rootClasses = cs({
    'ss-p-2 ss-space-y-2': true,
    'ss-w-1/2 md:ss-w-1/4': isSelectable,
    'ss-w-1/2': !isSelectable
  });

  return (
    <div className={rootClasses}>
      <Text variant="paragraphSmall">{title}</Text>
      {children}
    </div>
  );
};

const ExpandedItemSubTitle: FC<{ children?: ReactNode }> = ({ children }) => (
  <Text variant="paragraphSmall" className="ss-font-bold">
    {children}
  </Text>
);

export { ExpandedItemSubTitle };
export default ExpandedItem;
