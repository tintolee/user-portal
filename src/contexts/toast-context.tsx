/* eslint-disable no-unused-vars */
import React, { createContext, useContext, Component, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Transition, TransitionClasses } from '@headlessui/react';
import { noop, getUUID } from '@sendsprint/ui-react/dist/utils';
import {
  ToastContainer,
  ToastController,
  ToastPlacement,
  ToastAppearanceType,
  ToastContent
} from '@src/components/toast';
import { isUndefined } from '@src/utils/type';

type ToastId = string;

// eslint-disable-next-line no-unused-vars
type Callback = (id: ToastId) => void;

type Options = {
  appearance?: ToastAppearanceType;
  autoDismiss?: boolean;
  autoDismissTimeout?: number;
  onDismiss?: Callback;
};

type ToastType = Options & {
  id: ToastId;
  content: ToastContent;
  appearance: ToastAppearanceType;
};

type AddOptions = Options & {
  id?: ToastId;
  appearance: ToastAppearanceType;
};

type UpdateOptions = Options & {
  content?: ToastContent;
};

type HasToast = (id: ToastId) => boolean;

type AddToast = (content: ToastContent, options?: AddOptions, cb?: Callback) => void | ToastId;

type RemoveToast = (id: ToastId, cb?: Callback) => void;

type RemoveAllToasts = () => void;

type UpdateToast = (id: ToastId, options?: UpdateOptions, cb?: Callback) => void;

type ToastProviderProps = {
  /**
   * Whether or not to dismiss the toast automatically after autoDismissTimeout.
   */
  autoDismiss?: boolean;
  /**
   * The time until a toast will be dismissed automatically, in milliseconds.
   */
  autoDismissTimeout?: number;
  /**
   * App content
   */
  children: ReactNode;
  /**
   * Where, in relation to the viewport, to place the toasts
   */
  placement?: ToastPlacement;
};

type ToastProviderState = { toasts: ToastType[] };

type ToastContext = {
  hasToast: HasToast;
  addToast: AddToast;
  updateToast: UpdateToast;
  removeToast: RemoveToast;
  removeAllToasts: RemoveAllToasts;
  toasts: ToastType[];
};

type ToastTransitionDirection = 'left' | 'center' | 'right';

const Context = createContext<ToastContext | undefined>(undefined);

const getTransitionDirection = (placement: ToastPlacement): ToastTransitionDirection => {
  const directions: Record<ToastPlacement, ToastTransitionDirection> = {
    'top-left': 'left',
    'bottom-left': 'left',
    'top-center': 'center',
    'bottom-center': 'center',
    'bottom-right': 'right',
    'top-right': 'right'
  };
  return directions[placement];
};

const TOAST_TRANSITION_CLASSES: Record<ToastTransitionDirection, TransitionClasses> = {
  left: {
    enterFrom: 'ss--translate-x-full',
    enterTo: 'ss-translate-x-0',
    leaveFrom: 'ss-translate-x-0',
    leaveTo: 'ss--translate-x-full'
  },
  center: {
    enterFrom: 'ss-scale-75 ss-opacity-50',
    enterTo: 'ss-scale-100 ss-opacity-100',
    leaveFrom: 'ss-scale-100 ss-opacity-100',
    leaveTo: 'ss-scale-0 ss-opacity-0'
  },
  right: {
    enterFrom: 'ss-translate-x-full',
    enterTo: 'ss-translate-x-0',
    leaveFrom: 'ss-translate-x-0',
    leaveTo: 'ss-translate-x-full'
  }
};

class ToastProvider extends Component<ToastProviderProps, ToastProviderState> {
  static defaultProps = {
    autoDismiss: false,
    autoDismissTimeout: 5000,
    placement: 'top-right'
  };

  state: ToastProviderState = { toasts: [] };

  hasToast: HasToast = (id) => {
    if (!this.state.toasts.length) {
      return false;
    }
    return this.state.toasts.findIndex((t) => t.id === id) !== -1;
  };

  onDismiss =
    (id: ToastId, cb: ToastType['onDismiss'] = noop) =>
    () => {
      cb(id);
      this.removeToast(id);
    };

  addToast: AddToast = (content, options, cb = noop) => {
    const id = (options && options.id) || getUUID();
    const callback = () => cb(id);

    if (this.hasToast(id)) {
      return;
    }

    this.setState((state) => {
      const newToast: ToastType = {
        content,
        id,
        ...{ appearance: 'success' },
        ...options
      };
      const toasts = [...state.toasts, newToast];
      return { toasts };
    }, callback);

    return id;
  };

  removeToast: RemoveToast = (id, cb = noop) => {
    if (!this.hasToast(id)) {
      return;
    }
    const callback = () => cb(id);

    this.setState((state) => {
      const toasts = state.toasts.filter((t) => t.id !== id);
      return { toasts };
    }, callback);
  };

  removeAllToasts: RemoveAllToasts = () => {
    if (!this.state.toasts.length) {
      return;
    }

    this.state.toasts.forEach((t) => this.removeToast(t.id));
  };

  updateToast: UpdateToast = (id, options = {}, cb = noop) => {
    if (!this.hasToast(id)) {
      return;
    }
    const callback = () => cb(id);

    this.setState((state) => {
      const old = state.toasts;
      const i = old.findIndex((t) => t.id === id);
      const updatedToast: ToastType = { ...old[i], ...options };
      const toasts = [...old.slice(0, i), updatedToast, ...old.slice(i + 1)];
      return { toasts };
    }, callback);
  };

  render() {
    const {
      autoDismiss: inheritedAutoDismiss = false,
      autoDismissTimeout: inheritedAutoDismissTimeout = 5000,
      placement = 'top-right',
      children
    } = this.props;
    const { hasToast, addToast, removeToast, removeAllToasts, updateToast } = this;
    const toasts = this.state.toasts;

    const transitionDirection = getTransitionDirection(placement);
    const transitionProps = TOAST_TRANSITION_CLASSES[transitionDirection];

    return (
      <Context.Provider
        value={{
          hasToast,
          addToast,
          removeToast,
          removeAllToasts,
          updateToast,
          toasts
        }}>
        {children}

        {createPortal(
          <ToastContainer placement={placement} hasToasts={!!toasts.length}>
            {toasts.map(
              ({ appearance, autoDismiss, content, id, autoDismissTimeout, onDismiss }) => (
                <Transition
                  show={true}
                  appear={true}
                  key={id}
                  enter="ss-transition-all ss-transform-gpu ss-duration-200 ss-ease-out"
                  leave="ss-transition-all ss-transform-gpu ss-duration-200 ss-ease-out"
                  {...transitionProps}>
                  <ToastController
                    appearance={appearance}
                    autoDismiss={autoDismiss !== undefined ? autoDismiss : inheritedAutoDismiss}
                    autoDismissTimeout={
                      autoDismissTimeout !== undefined
                        ? autoDismissTimeout
                        : inheritedAutoDismissTimeout
                    }
                    key={id}
                    content={content}
                    onDismiss={this.onDismiss(id, onDismiss)}
                  />
                </Transition>
              )
            )}
          </ToastContainer>,
          document.body
        )}
      </Context.Provider>
    );
  }
}

const useToasts = () => {
  const context = useContext(Context);

  if (isUndefined(context)) {
    throw Error('useToasts must be used within a ToastProvider');
  }

  return context;
};

export type {
  ToastProviderProps,
  ToastType,
  HasToast,
  AddToast,
  RemoveToast,
  RemoveAllToasts,
  UpdateToast
};
export { ToastProvider, useToasts };
