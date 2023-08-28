import React, { FC, ReactNode } from 'react';
import Text from '@sendsprint/ui-react/dist/components/Text';

type ErrorCardProps = {
  imageContent: ReactNode;
  title: string;
  content: ReactNode;
  footer: ReactNode;
};

const ErrorCard: FC<ErrorCardProps> = ({ imageContent, title, content, footer }) => {
  return (
    <div className="ss-rounded ss-overflow-hidden ss-shadow ss-bg-white ss-text-center">
      {imageContent}
      <div className="ss-py-10 ss-max-w-lg ss-mx-auto">
        <Text as="h1" variant="h6" className="ss-text-neutral-60 ss-mb-4">
          {title}
        </Text>
        <Text className="ss-text-neutral-40">{content}</Text>
        <div className="ss-mt-8">{footer}</div>
      </div>
    </div>
  );
};

export type { ErrorCardProps };
export default ErrorCard;
