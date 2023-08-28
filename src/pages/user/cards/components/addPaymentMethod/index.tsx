import { Box, Button, ExtraInfo, Form, FormField, Icon, Text } from '@sendsprint/ui-react';
import {
  CalendarOutline,
  CloseOutline,
  CreditCardOutline,
  PersonOutline
} from '@sendsprint/ui-react/dist/icons';
import { Dialog2 } from '@src/components';
import React from 'react';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export interface CardFormI {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

const initialValues: CardFormI = {
  cardNumber: '',
  cvv: '',
  expiryDate: '',
  nameOnCard: ''
};

const AddPaymentMethod = ({ handleClose, isOpen }: Props) => {
  const handleSubmit = (values: CardFormI) => {
    console.log(values);
  };
  return (
    <Dialog2 disableOverlayClick isOpen={isOpen} handleClose={handleClose}>
      <Box
        style={{
          backgroundColor: '#F6F8FA'
        }}
        className="ss-h-max ss-min-h-screen">
        <Box className="ss-flex ss-justify-between ss-mb-6 ss-items-center">
          <Text className="ss-text-neutral-500" variant="h5">
            Add a payment method
          </Text>
          <Button
            onClick={handleClose}
            label={<Icon svg={CloseOutline} size={24} />}
            variant="tertiary"
            className="ss-p-0"
          />
        </Box>
        <Form<CardFormI> initialValues={initialValues} onSubmit={handleSubmit}>
          <Box className="ss-bg-white ss-p-5 ss-rounded-lg ss-space-y-4 ss-mb-6">
            <ExtraInfo extraInfo="Please note that in order to add this payment method, we'll have to charge this card. The money will be refunded within minutes." />
            <FormField name="cardNumber" label="Card number" icon={CreditCardOutline} />
            <Box className="ss-flex ss-flex-col md:ss-flex-row ss-gap-4">
              <FormField name="expiryDate" label="Expiry date" icon={CalendarOutline} />
              <FormField name="cvv" label="CVV" icon={CreditCardOutline} />
            </Box>
            <FormField name="nameOnCard" label="Name on card" icon={PersonOutline} />
          </Box>
          <Box className="ss-space-y-4">
            <Button label="Add" type="submit" isBlock />
            <Button onClick={handleClose} label="Cancel" isBlock variant="secondary" />
          </Box>
        </Form>
      </Box>
    </Dialog2>
  );
};

export default AddPaymentMethod;
