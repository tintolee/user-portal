import { Box, Text } from '@sendsprint/ui-react';
import React from 'react';
import cs from 'classnames';
import { FormSteps } from '.';

interface Props {
  currentStep: number;
  handleStepClick: (arg: FormSteps) => void;
  enteredSteps: FormSteps[];
  isWithoutAccountInfo: boolean;
}

const stepperDataList = [
  {
    label: 'Account Information'
  },
  {
    label: "Recipient's Information"
  }
];

const stepperDataWithoutAcountInfo = [
  {
    label: "Recipient's Information"
  }
];

const Stepper = ({ currentStep, handleStepClick, enteredSteps, isWithoutAccountInfo }: Props) => {
  const stepperData = isWithoutAccountInfo ? stepperDataWithoutAcountInfo : stepperDataList;

  const isClickable = (arg: FormSteps) => enteredSteps.includes(arg);
  return (
    <Box className="ss-flex ss-items-center ss-bg-white ss-p-4 ss-rounded-lg ss-mb-6 ss-gap-4">
      {stepperData.map((item, index) => (
        <button
          type="button"
          onClick={() => handleStepClick((index + 1) as FormSteps)}
          className={cs('ss-flex-1  ss-flex ss-flex-col ss-items-center ss-gap-1', {
            'ss-cursor-pointer focus:ss-focus-ring': isClickable((index + 1) as FormSteps),
            'ss-cursor-not-allowed focus:ss-outline-none': !isClickable((index + 1) as FormSteps)
          })}
          key={item.label}>
          <Text
            variant="paragraphVerySmall"
            className={cs('ss-text-neutral-300 ss-hidden md:ss-block', {
              'ss-text-neutral-400': currentStep > index + 1,
              'ss-text-primary1-500': currentStep === index + 1
            })}>
            {item.label}
          </Text>
          <Box
            className={cs(' ss-w-full ss-h-1 ss-rounded-full', {
              'ss-bg-success-500': currentStep > index + 1,
              'ss-bg-primary1-500': currentStep === index + 1,
              'ss-bg-neutral-300': currentStep < index + 1
            })}
          />
        </button>
      ))}
    </Box>
  );
};

export default Stepper;
