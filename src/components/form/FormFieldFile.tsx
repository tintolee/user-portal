import { Box, ExtraInfo, Icon, Text } from '@sendsprint/ui-react';
import { CheckmarkOutline } from '@sendsprint/ui-react/dist/icons';
import { ErrorMessage, useField } from 'formik';
import { GrFormClose } from 'react-icons/gr';
import React, { ReactNode, useId, useRef } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

interface FormFieldFileProps {
  name: string;
  extraInfo?: ReactNode;
}

const FormFieldFile = ({ name, extraInfo }: FormFieldFileProps) => {
  const id = useId();
  const labelRef = useRef<HTMLLabelElement>(null);
  const [{ value }, , { setValue }] = useField<File | undefined>(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setValue(e.target.files[0]);
    }
  };

  const handleBtnClick = () => {
    if (labelRef && labelRef.current) {
      labelRef.current.click();
    }
  };

  const handleRemove = () => {
    setValue(undefined);
  };

  return (
    <div>
      {!value && (
        <label ref={labelRef} htmlFor={id}>
          <input type="file" name={name} className="ss-hidden" id={id} onChange={handleChange} />
          <button
            onClick={handleBtnClick}
            type="button"
            className="ss-w-full focus:ss-focus-ring ss-relative ss-gap-3 ss-py-10 ss-bg-neutral-100 ss-px-4 ss-flex ss-justify-center ss-items-center ss-border ss-overflow-hidden ss-border-dashed ss-border-neutral-300 ss-rounded-lg">
            <FiUploadCloud size={24} />
            <Box className="ss-space-y-1">
              <Text variant="paragraphSmall" className="ss-text-neutral-400">
                Drag and drop document here or <span className="ss-text-neutral-700">Browse</span>
              </Text>
              <Text variant="paragraphVerySmall" className="ss-text-neutral-400">
                Supported file types: JPEG, PNG, PDF. Max file size: 2mb
              </Text>
            </Box>
          </button>
        </label>
      )}
      {value && (
        <div className="ss-relative ss-py-10 ss-bg-neutral-100 ss-px-4 ss-flex ss-justify-between ss-items-center ss-border ss-overflow-hidden ss-border-dashed ss-border-neutral-300 ss-rounded-lg">
          <div className="ss-flex ss-items-center ss-gap-3">
            <Box className="ss-bg-primary1-500 ss-w-7 ss-h-7 ss-flex ss-items-center ss-justify-center ss-rounded-full">
              <Icon className="ss-text-white" svg={CheckmarkOutline} />
            </Box>
            <Text>{value.name}</Text>
          </div>
          <button
            type="button"
            className="ss-w-6 ss-border ss-border-neutral-200 ss-h-6 ss-rounded-full ss-flex ss-justify-center ss-items-center focus:ss-focus-ring"
            onClick={handleRemove}>
            <GrFormClose />
          </button>
        </div>
      )}
      <ErrorMessage name={name}>
        {(errMessage) => <ExtraInfo variant="error" extraInfo={errMessage} />}
      </ErrorMessage>
      {extraInfo && <ExtraInfo extraInfo={extraInfo} />}
    </div>
  );
};

export default FormFieldFile;
