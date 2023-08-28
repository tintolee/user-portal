import React, { FC, ReactNode } from 'react';
import { useField } from 'formik';

type PasswordValidationInfoProps = {
  passwordFieldName: string;
  className?: string;
};

const CONTAINS_LETTER_REGEX = new RegExp('[a-zA-Z]+');
const CONTAINS_NUMBER_REGEX = new RegExp('[0-9]+');

const PasswordValidationInfo: FC<PasswordValidationInfoProps> = ({
  passwordFieldName,
  className
}) => {
  const [{ value: v }] = useField(passwordFieldName);
  const value: string = v.trim();

  const valueContainsLetter = CONTAINS_LETTER_REGEX.test(value);
  const valueContainsNumber = CONTAINS_NUMBER_REGEX.test(value);
  const valueHasMin8Chars = value.length >= 8;

  return (
    <div className={className}>
      Password must have:
      <ul className="ss-flex ss-flex-col">
        <ValidationItem showLineThrough={valueContainsLetter}>a letter</ValidationItem>
        <ValidationItem showLineThrough={valueContainsNumber}>a number</ValidationItem>
        <ValidationItem showLineThrough={valueHasMin8Chars}>
          a minimum of 8 characters
        </ValidationItem>
      </ul>
    </div>
  );
};

interface ValidationItemProps {
  showLineThrough: boolean;
  children?: ReactNode;
}

const ValidationItem: FC<ValidationItemProps> = ({ showLineThrough, ...props }) => (
  <li className={showLineThrough ? 'ss-line-through' : ''} {...props} />
);

export type { PasswordValidationInfoProps };
export default PasswordValidationInfo;
