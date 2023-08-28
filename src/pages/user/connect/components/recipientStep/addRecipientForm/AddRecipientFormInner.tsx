import ClientApi from '@src/types/client';
import RecipientInfo from './RecipientInfo';
import { TransferInfoProps } from './transferInfo';

type AddRecipientFormInnerProps = {
  addRecipientLoading: boolean;
  receiveCountries: ClientApi.GiftCountries[];
} & Omit<
  TransferInfoProps,
  'receiveCountries' | 'getPaymentTypesLoading' | 'paymentTypesData' | 'handleToggleStep'
>;

const AddRecipientFormInner = ({
  addRecipientLoading,
  receiveCountries
}: AddRecipientFormInnerProps) => {
  return (
    <>
      <RecipientInfo
        receiveCountries={receiveCountries}
        addRecipientLoading={addRecipientLoading}
      />
    </>
  );
};

export default AddRecipientFormInner;
