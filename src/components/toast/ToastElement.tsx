/* eslint-disable no-unused-vars */
import React, { FC, ReactNode } from 'react';
import cs from 'classnames';
import { CloseButton, Icon, Text } from '@sendsprint/ui-react';
import { noop } from '@sendsprint/ui-react/dist/utils';
import { ReactComponent as SuccessIcon } from './toast-success-icon.svg';
import { ReactComponent as WarningIcon } from './toast-warning-icon.svg';

type ToastAppearanceType = 'success' | 'warning';

type ToastContent = {
  title?: string;
  body: string;
};

type ToastElementProps = {
  appearance: ToastAppearanceType;
  autoDismiss: boolean; // inherited from ToastProvider
  autoDismissTimeout: number; // inherited from ToastProvider
  content: ToastContent;
  isRunning: boolean;
  onDismiss: (id?: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children?: ReactNode;
};

const ToastElement: FC<ToastElementProps> = ({
  appearance,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  autoDismiss,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  autoDismissTimeout,
  content,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isRunning,
  onDismiss,
  ...otherProps
}) => {
  const { title = '', body = '' } = content;
  const isSuccess = appearance === 'success';
  const isWarning = appearance === 'warning';

  return (
    <div className="ss-flex ss-max-w-3xl ss-bg-white ss-rounded ss-shadow-lg" {...otherProps}>
      <div
        className={cs({
          'ss-w-20 ss-flex ss-justify-center ss-items-center ss-bg-opacity-30 ss-rounded-l': true,
          'ss-bg-success-500 ss-text-primary1-500': isSuccess,
          'ss-bg-primary3-500 ss-text-primary3-700': isWarning
        })}>
        {isSuccess && <Icon size={32} svg={SuccessIcon} />}
        {isWarning && <Icon size={32} svg={WarningIcon} />}
      </div>

      <div className="ss-p-4 ss-flex-grow ss-flex ss-flex-col ss-justify-center">
        <div className="ss-space-y-1">
          {/*  eslint-disable-next-line react/no-children-prop */}
          {title && (
            <Text variant="h6" className="ss-text-primary1-500">
              {title}
            </Text>
          )}
          {/*  eslint-disable-next-line react/no-children-prop */}
          {body && (
            <Text variant="paragraphSmall" className="ss-text-primary1-300">
              {body}
            </Text>
          )}
        </div>
      </div>

      {onDismiss && (
        <div className="ss-py-4 ss-px-2 ss-flex ss-items-center">
          <CloseButton onClick={() => onDismiss()} />
        </div>
      )}
    </div>
  );
};

ToastElement.defaultProps = {
  onMouseEnter: noop,
  onMouseLeave: noop,
  onDismiss: noop
};

export type { ToastElementProps, ToastAppearanceType, ToastContent };
export default ToastElement;
