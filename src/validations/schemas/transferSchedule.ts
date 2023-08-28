import * as yup from 'yup';

const stringSchema = yup.string().trim();

export const transferScheduleSchema = {
  transferType: stringSchema.required('Please select a transfer type'),
  startDate: stringSchema.required('Please select start date'),
  endDate: stringSchema.required('Please select end date'),
  interval: stringSchema.required('Please select interval'),
  name: stringSchema.required('Please fill this field'),
  duration: stringSchema
    .matches(/^[0-9]*$/, {
      message: 'Please enter only numbers'
    })
    .test('Minimum number', 'Minimum number is 2', (value) => {
      if (value) {
        if (Number(value) < 2) {
          return false;
        }
      }

      return true;
    })
    .required('Please fill this field')
};
