import { Box } from '@sendsprint/ui-react';
import { Dialog2 } from '@src/components';
import { useConnect } from '@src/contexts';
import ClientApi from '@src/types/client';
import React, { useCallback, useEffect, useState } from 'react';
import BuyGift from './BuyGift';
import DetailsSection from './DetailsSection';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  productIdFromQuery: string | null;
  markPageAsClean: () => void;
}

const ProductDetails = ({ handleClose, isOpen, productIdFromQuery, markPageAsClean }: Props) => {
  const [isAdded, setIsAdded] = useState(false);
  const [productDetails, setProductDetails] = useState<ClientApi.GiftMerchants | null>(null);
  const { state } = useConnect();

  useEffect(() => {
    if (productIdFromQuery && state.products.productList) {
      const filteredProduct = state.products.productList.find(
        (product) => product.Id.toString() === productIdFromQuery
      );

      if (filteredProduct) {
        setProductDetails(filteredProduct);
      }
    }
  }, [productIdFromQuery, state.products.productList]);

  const handleClose2 = useCallback(() => {
    setIsAdded(false);
    handleClose();
  }, []);

  const handleClose3 = useCallback(() => {
    setIsAdded(true);
    markPageAsClean();
  }, []);

  return (
    <Dialog2 size="content" isOpen={isOpen} handleClose={handleClose3}>
      <Box className="ss-flex ss-flex-col md:ss-flex-row ss-h-full">
        <DetailsSection state={state} handleClose={handleClose3} productDetails={productDetails} />
        <BuyGift
          markPageAsClean={markPageAsClean}
          state={state}
          productDetails={productDetails}
          handleClose={handleClose3}
          setIsAdded={setIsAdded}
        />
        {isAdded && <DummyComponent handleClose={handleClose2} />}
      </Box>
    </Dialog2>
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

export default ProductDetails;
