import React, { FC, ReactNode } from 'react';
import cs from 'classnames';

type ToastPlacement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

type ToastContainerProps = {
  hasToasts: boolean;
  placement: ToastPlacement;
  children?: ReactNode;
};

const ToastContainer: FC<ToastContainerProps> = ({ hasToasts, children, placement }) => {
  const placementClasses: Record<ToastPlacement, string> = {
    'top-left': 'ss-top-0 ss-left-0',
    'top-center': 'ss-top-0 ss-left-1/2 ss--translate-x-1/2',
    'top-right': 'ss-top-0 ss-right-0',
    'bottom-left': 'ss-bottom-0 ss-left-0',
    'bottom-center': 'ss-bottom-0 ss-left-1/2 ss--translate-x-1/2',
    'bottom-right': 'ss-bottom-0 ss-right-0'
  };

  const rootClasses = cs(
    {
      'ss-max-h-full ss-fixed ss-z-50 ss-space-y-4 ss-overflow-y-auto ss-overflow-x-hidden': true,
      'ss-pointer-events-none': !hasToasts,
      'ss-px-4 ss-py-6 md:ss-p-10': hasToasts
    },
    placementClasses[placement]
  );
  return <div className={rootClasses}>{children}</div>;
};

ToastContainer.defaultProps = {};

export type { ToastContainerProps, ToastPlacement };
export default ToastContainer;
