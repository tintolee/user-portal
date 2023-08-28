import Box from '@sendsprint/ui-react/dist/components/Box';
import Button from '@sendsprint/ui-react/dist/components/Button';
import Text from '@sendsprint/ui-react/dist/components/Text';
import React, { ReactNode } from 'react';
import { ErrorImage } from './images';
import cs from 'classnames';
import { IoReloadOutline } from 'react-icons/io5';

interface Props {
  title?: string;
  content?: ReactNode;
  footer?: ReactNode;
  iconSize?: 'normal' | 'small';
  showRetryBtn?: boolean;
  retryFunc?: () => void;
  errorText?: string;
}

const ErrorState = ({
  content,
  footer,
  title,
  iconSize = 'normal',
  retryFunc,
  showRetryBtn,
  errorText
}: Props) => {
  return (
    <Box>
      <div className="ss-rounded ss-overflow-hidden ss-text-center">
        <div className="ss-p-8 ss-bg-neutral-20">
          <ErrorImage
            className={cs(' ss-inline-block', {
              'ss-h-44 ss-w-44': iconSize === 'normal',
              'ss-h-20 ss-w-20': iconSize === 'small'
            })}
            role="presentation"
          />
        </div>
        <div className="ss-py-10 ss-max-w-lg ss-mx-auto">
          {title && (
            <Text as="h1" variant="h6" className="ss-text-neutral-60 ss-mb-4">
              {title}
            </Text>
          )}
          {content && <Text className="ss-text-neutral-40">{content}</Text>}
          {errorText && <Text className="ss-text-neutral-40 ss-font-semibold">{errorText}</Text>}
          {showRetryBtn && (
            <Box className="ss-my-3">
              <Button
                label="Retry"
                variant="secondary"
                size="small"
                icon={IoReloadOutline}
                onClick={retryFunc}
              />
            </Box>
          )}
          {footer && <div className="ss-mt-8">{footer}</div>}
        </div>
      </div>
    </Box>
  );
};

export default ErrorState;
