import React, { FC, ReactNode } from 'react';
import cs from 'classnames';
import {
  Text,
  useId,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogProps
} from '@sendsprint/ui-react';

type ImageDialogProps = {
  imageContent: ReactNode;
  title: ReactNode;
  bodyContent: ReactNode;
} & Pick<
  DialogProps,
  'footerContent' | 'titleAs' | 'isOpen' | 'onDismiss' | 'showCloseButton' | 'initialFocusRef'
>;

/**
 * Dialog with a large image / icon at the top, before the header
 */
const ImageDialog: FC<ImageDialogProps> = ({
  imageContent,
  title,
  titleAs,
  bodyContent,
  footerContent,
  ...props
}) => {
  const titleId = useId();
  const sizingClasses = 'ss-text-center ss-max-w-2xl lg:ss-max-w-xl ss-mx-auto';
  return (
    <Dialog {...props} aria-labelledby={titleId}>
      <div className="ss-text-center">{imageContent}</div>
      <DialogHeader className="ss-pb-4">
        {/* eslint-disable-next-line react/no-children-prop */}
        <DialogTitle as={titleAs} id={titleId} className={sizingClasses} children={title} />
      </DialogHeader>
      <DialogBody className="ss-pt-0">
        {/* eslint-disable-next-line react/no-children-prop */}
        <Text className={cs('ss-text-neutral-40', sizingClasses)} children={bodyContent} />
      </DialogBody>
      {footerContent && (
        <DialogFooter>
          <div className={sizingClasses}>{footerContent}</div>
        </DialogFooter>
      )}
    </Dialog>
  );
};

export type { ImageDialogProps };
export default ImageDialog;
