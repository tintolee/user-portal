import { Box, Text } from '@sendsprint/ui-react';
import { useField } from 'formik';
import { useEffect, useId, useState } from 'react';
import cs from 'classnames';

interface IntervalRowProps {
  title: string;
  description: string;
  name: string;
  value: string;
}

const IntervalRow = ({ description, title, name, value }: IntervalRowProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [{ value: fieldValue }, { error, touched }, { setValue }] = useField(name);

  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (fieldValue === value) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [fieldValue, value]);

  const canShowError = error && touched;

  return (
    <label
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      htmlFor={id}
      className={cs(
        'ss-flex ss-border ss-border-transparent ss-items-center ss-cursor-pointer ss-p-4 ss-rounded-lg ss-gap-4',
        {
          'ss-bg-success-100 ss-border-neutral-400': isHovered || isChecked,
          'ss-border-error-100': canShowError
        }
      )}>
      <Box className="ss-flex-1">
        <Text className="ss-text-neutral-500 ss-font-bold">{title}</Text>
        <Text>{description}</Text>
      </Box>
      <Box className="ss-w-5 ss-h-5 ss-border-2 ss-rounded-full ss-border-primary1-500 ss-relative">
        <Box
          className={cs(
            'ss-absolute ss-right-0.5 ss-rounded-full ss-bg-primary1-500 ss-left-0.5 ss-top-0.5 ss-bottom-0.5',
            {
              'ss-opacity-100': isChecked,
              'ss-opacity-0': !isChecked
            }
          )}
        />
      </Box>
      <input
        type="radio"
        id={id}
        name={name}
        checked={fieldValue === value}
        onChange={handleChange}
        value={value}
        className="ss-hidden"
      />
    </label>
  );
};

export default IntervalRow;
