import React, { ReactNode } from 'react';

interface Props {
  fieldsData: string[];
  fieldName: string;
  children?: ReactNode;
}

const ResolvedFormField = ({ children, fieldsData, fieldName }: Props) => {
  const isFieldNamePartOfForm = fieldsData.includes(fieldName);

  if (!isFieldNamePartOfForm) return null;

  return <>{children}</>;
};

export default ResolvedFormField;
