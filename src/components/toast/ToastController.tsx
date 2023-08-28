import React, { useState, useEffect, FC } from 'react';
import { noop } from '@sendsprint/ui-react/dist/utils';
import ToastElement, { ToastElementProps } from './ToastElement';

type TimeoutID = NodeJS.Timeout;

type TimerType = {
  clear: () => void;
  pause: () => void;
  resume: () => void;
};

type ToastControllerProps = Omit<ToastElementProps, 'isRunning' | 'onMouseEnter' | 'onMouseLeave'>;

/**
 * Returns a timer object with clear(), pause() and resume() methods to manage timer for autoDismiss
 * @param callback - function to execute after the timer finishes
 * @param delay - the delay before executing the callback
 */
function Timer(callback: () => void, delay: number): TimerType {
  let timerId: TimeoutID;
  let start = delay;
  let remaining = delay;

  const clear = function () {
    clearTimeout(timerId);
  };

  const pause = function () {
    clear();
    remaining -= Date.now() - start;
  };

  const resume = function () {
    start = Date.now();
    clear();
    timerId = setTimeout(callback, remaining);
  };

  resume();

  return { clear, pause, resume };
}

const ToastController: FC<ToastControllerProps> = (props) => {
  const { autoDismiss, autoDismissTimeout, onDismiss } = props;
  const [isRunning, setIsRunning] = useState(autoDismiss);
  const [timer, setTimer] = useState<TimerType>();

  useEffect(() => {
    if (!autoDismiss) {
      return;
    }
    setIsRunning(true);
    setTimer(Timer(onDismiss, autoDismissTimeout));

    return function () {
      if (timer) {
        timer.clear();
      }
    };
  }, [autoDismiss]);

  const onMouseEnter = () => {
    if (timer) {
      timer.pause();
    }
    setIsRunning(false);
  };
  const onMouseLeave = () => {
    if (timer) {
      timer.resume();
    }
    setIsRunning(true);
  };

  return (
    <ToastElement
      isRunning={isRunning}
      onMouseEnter={autoDismiss ? onMouseEnter : noop}
      onMouseLeave={autoDismiss ? onMouseLeave : noop}
      {...props}
    />
  );
};

ToastController.defaultProps = {
  autoDismiss: false
};
export type { ToastControllerProps };
export default ToastController;
