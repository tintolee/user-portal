import { Box, Button, Form, FormField, Text } from '@sendsprint/ui-react';
import { CalendarOutline, InfoOutline } from '@sendsprint/ui-react/dist/icons';
import { Shape } from '@src/validations';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as yup from 'yup';

export interface GiftInformationData {
  purpose: string;
  deliveryDate: string;
}

export interface GiftInformationProps {
  formData?: GiftInformationData;
  // editMode?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSuccess: (value: GiftInformationData) => void;
}

const yesterday = new Date(Date.now() - 86400000);

const initialValues: GiftInformationData = {
  purpose: '',
  deliveryDate: ''
};

const validationSchema = yup.object().shape<Shape<GiftInformationData>>({
  deliveryDate: yup
    .date()
    .required('Please select delivery date')
    .min(yesterday, 'The minimum date to be selected is today'),
  purpose: yup.string().required('Please enter the purpose')
});

const GiftInformation = ({ onSuccess, formData }: GiftInformationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClearConnectQueries = () => {
    searchParams.delete('cart');
    searchParams.delete('connect');
    searchParams.delete('recipientCurrency');
    searchParams.delete('senderCurrency');
    searchParams.delete('rate');
    searchParams.delete('totalAmount');
    searchParams.delete('totalAmountPlusFee');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (searchParams.get('connect')) {
      handleClearConnectQueries();
    }
  }, []);
  return (
    <Box>
      <Form<GiftInformationData>
        validationSchema={validationSchema}
        className="ss-space-y-5"
        initialValues={formData || initialValues}
        onSubmit={onSuccess}>
        <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-mb-5 ss-rounded">
          <Text className="ss-text-neutral-400 ss-mb-3 ss-font-bold">
            What&apos;s this gift for?
          </Text>
          <FormField name="purpose" icon={InfoOutline} label="Purpose" />
        </Box>
        <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-mb-5 ss-rounded">
          <Text className="ss-text-neutral-400 ss-mb-3 ss-font-bold">
            When do you want this gift delivered?
          </Text>
          <FormField
            name="deliveryDate"
            type="date"
            icon={CalendarOutline}
            label="Delivery time and date"
          />
        </Box>
        <Box>
          <Button label="Continue" isBlock type="submit" />
        </Box>
      </Form>
    </Box>
  );
};

export default GiftInformation;
