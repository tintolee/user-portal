import { Box, Button, Form, Icon, Text } from '@sendsprint/ui-react';
import { CloseOutline } from '@sendsprint/ui-react/dist/icons';
import { useConnect } from '@src/contexts';
import { ConnectState } from '@src/contexts/connect-context/types';
import ClientApi from '@src/types/client';
import React, { useEffect } from 'react';
import Amount from './Amount';
import CustomAmount from './CustomAmount';
import QuantitySection from './QuantitySection';
import * as yup from 'yup';
import { Shape } from '@src/validations';
import { currencyConverter2, getCurrencySymbol } from '@src/utils';
import { getMonetaryValue } from '@src/utils/currency';
import { FormikHelpers } from 'formik';

interface Props {
  handleClose: () => void;
  productDetails: ClientApi.GiftMerchants | null;
  state: ConnectState;
  markPageAsClean: () => void;
  setIsAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InitialValuesI {
  amount: string;
  sendersCurrency: string;
  quantity: string;
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const BuyGift = ({ handleClose, productDetails, state, markPageAsClean, setIsAdded }: Props) => {
  const { handleAddToCart } = useConnect();
  // const [isAdded, setIsAdded] = useState(false);

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const handleSubmit = (values: InitialValuesI, formikHelpers: FormikHelpers<InitialValuesI>) => {
    // markPageAsClean();
    if (productDetails) {
      const cartPayload: ClientApi.CartI = {
        ...productDetails,
        Amount: Number(values.amount),
        Quantity: Number(values.quantity)
      };

      // formikHelpers.setTouched({ amount: false, quantity: false, sendersCurrency: false });
      handleAddToCart(cartPayload);
      markPageAsClean();
      handleClose();

      // setIsAdded(true);
      markPageAsClean();
    }
  };

  const validationSchema = yup.object().shape<Shape<InitialValuesI>>({
    amount: yup
      .number()
      .required('Please enter amount')
      .min(
        productDetails?.MinimumPrice || 0,
        `Amount should not be less than ${currencyConverter2(
          getMonetaryValue(productDetails?.MinimumPrice || 0),
          getCurrencySymbol(productDetails?.Country) || ''
        )}`
      ),
    quantity: yup.number().required('Please select quantity'),
    sendersCurrency: yup.string()
  });
  return (
    <Box className="ss-w-full md:ss-w-350 lg:ss-w-500 ss-p-5 ss-h-full md:ss-h-full md:ss-overflow-y-auto">
      <Box className="ss-hidden md:ss-flex ss-justify-between ss-mb-6 ss-items-center">
        <Text className="ss-text-neutral-500" variant="h5">
          Buy gift
        </Text>
        <Button
          onClick={handleClose}
          label={<Icon svg={CloseOutline} size={24} />}
          variant="tertiary"
          className="ss-p-0"
        />
      </Box>
      <Form<InitialValuesI>
        initialValues={{
          amount: '',
          sendersCurrency: `0 ${state.sender.selectedCountry?.currency}`,
          quantity: '1'
        }}
        validationSchema={validationSchema}
        className="ss-space-y-5"
        onSubmit={handleSubmit}>
        {/* {isAdded && <DummyComponent handleClose={handleClose2} />} */}
        <Box className="ss-bg-white ss-p-6 ss-space-y-5 ss-rounded-lg ss-mt-6">
          <Amount productDetails={productDetails} />
          <CustomAmount />
        </Box>
        <QuantitySection />
        <Box className="ss-space-y-4">
          <Button label="Add to cart" type="submit" isBlock />
          <Button onClick={handleClose} label="Cancel" isBlock variant="tertiary" />
        </Box>
      </Form>
    </Box>
  );
};

interface DummyProps {
  handleClose: () => void;
}

export const DummyComponent = ({ handleClose }: DummyProps) => {
  useEffect(() => {
    handleClose();
  }, []);
  return null;
};

export default BuyGift;
