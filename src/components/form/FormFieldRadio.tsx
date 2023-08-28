import cs from 'classnames';
import { Field, FieldProps } from 'formik';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { FormError } from '..';

interface sortedDataI {
  value: string;
  label: string;
  id: string;
}

interface Props {
  label?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  optionValue: string;
  optionLabel: string;
  className?: string;
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const FormRadio: React.FC<Props> = ({ label, name, data, optionLabel, optionValue, className }) => {
  const [sortedData, setSortedData] = useState<sortedDataI[]>([]);

  useEffect(() => {
    const opts = data.map((item) => {
      const optionData: sortedDataI = {
        value: item[optionValue],
        label: item[optionLabel],
        id: v4()
      };

      return optionData;
    });

    setSortedData(opts);
  }, [data, optionLabel, optionValue]);

  const classes = cs('formRadio', { className });

  return (
    <div className={classes}>
      <Field name={name}>
        {({ field }: FieldProps) => {
          return (
            <div className="formRadio__radios">
              {sortedData.map((item) => (
                <div key={item.id} className="ss-flex ss-items-center ss-mb-4 ss-relative">
                  <input
                    className="ss-sort-item-input ss-appearance-none ss-w-7 ss-h-7 ss-border ss-border-neutral-20 ss-rounded-full checked:ss-bg-primary-10 checked:ss-border-primary-100"
                    type="radio"
                    id={item.id}
                    {...field}
                    value={item.value}
                    checked={field.value === item.value}
                  />
                  <label className="ss-flex ss-items-center ss-ml-2 ss-w-full" htmlFor={item.id}>
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          );
        }}
      </Field>
      <FormError name={name} />
    </div>
  );
};

export default FormRadio;
