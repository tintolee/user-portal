import React, { useEffect, useState } from 'react';

type OpenStateWatcherProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export const OpenStateWatcher = (props: OpenStateWatcherProps) => {
  const [isOpen, setIsOpen] = useState(props.isOpen);

  useEffect(() => {
    if (isOpen === props.isOpen) {
      return;
    }
    props.onOpenChange(props.isOpen);
    setIsOpen(props.isOpen);
  }, [props.isOpen, isOpen]);

  return null;
};
