import React, { useEffect, useState, ComponentType } from 'react';
import cs from 'classnames';
import Button from '@sendsprint/ui-react/dist/components/Button';
import Text from '@sendsprint/ui-react/dist/components/Text';
import RefreshOutline from '@sendsprint/ui-react/dist/icons/RefreshOutline';

type LoadingProps = {
  delay?: number;
  timeout?: number;
  ballSize?: 'normal' | 'small';
  height?: 'screen' | 'content';
  className?: string;
  showTimedOutScreen?: boolean;
};

const Loading: ComponentType<LoadingProps> = ({
  delay = 0,
  timeout = 60000,
  ballSize = 'normal',
  className,
  height = 'screen',
  showTimedOutScreen = false
}) => {
  const [pastDelay, setPastDelay] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer1 = window.setTimeout(() => {
      setPastDelay(true);
    }, delay);

    const timer2 = window.setTimeout(() => {
      setTimedOut(true);
    }, timeout);

    return () => {
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);
    };
  }, [delay, timeout]);

  const retry = () => {
    window.location.reload();
  };

  if (!pastDelay) {
    return null;
  }

  const loadingItemClasses =
    'ss-absolute ss-inset-0 ss-bg-primary1-500 ss-bg-opacity-50 ss-rounded-full';

  return (
    <div
      className={cs('ss-flex ss-flex-col ss-items-center ss-justify-center', {
        'ss-h-screen': height === 'screen',
        [`${className}`]: className
      })}>
      <div className="ss-space-y-8 ss-text-center ss-max-w-2xl">
        <div>
          <div
            className={cs('ss-relative ss-inline-block ss-mx-auto', {
              'ss-w-32 ss-h-32': ballSize === 'normal',
              'ss-w-10 ss-h-10': ballSize === 'small'
            })}>
            <div className={cs(loadingItemClasses, 'ss-animate-loading1st')} />
            <div className={cs(loadingItemClasses, 'ss-animate-loading2nd')} />
          </div>
        </div>

        {timedOut && showTimedOutScreen && (
          <>
            <Text as="div" variant="paragraphRegular" className="ss-text-neutral-80">
              It&apos;s taking too long to load the page. You might want to try again.
            </Text>
            <Button
              onClick={retry}
              icon={RefreshOutline}
              label="Retry"
              isBlock={true}
              variant="secondary"
              className="ss-max-w-xs ss-mx-auto"
            />
          </>
        )}
      </div>
    </div>
  );
};

export type { LoadingProps };
export default Loading;
