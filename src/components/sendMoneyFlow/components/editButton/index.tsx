import { Button } from '@sendsprint/ui-react';
import { EditOutline } from '@sendsprint/ui-react/dist/icons';
import React from 'react';

interface Props {
  onEdit: () => void;
  label?: string;
}

const EditButton = ({ onEdit, label = 'Change' }: Props) => {
  return (
    <Button
      onClick={onEdit}
      variant="secondary"
      className="ss-py-1"
      label={label}
      icon={EditOutline}
    />
  );
};

export default EditButton;
