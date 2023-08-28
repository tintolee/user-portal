import { Box, Button, Text } from '@sendsprint/ui-react';
import { Loader } from '@src/components';
import { useConnect } from '@src/contexts';
import { useLazyPagination, useToggle } from '@src/hooks';
import ClientApi from '@src/types/client';
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmptyGiftScreen from './EmptyGiftScreen';
import ProductCard from './productCard';
import ProductDetails from './productDetails';

interface Props {
  search: string;
  isConnectDataLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  markPageAsClean: () => void;
}

const ProductList = ({ search, isConnectDataLoading, markPageAsClean }: Props) => {
  const [filteredCountryData, setFilteredCountryData] = useState<ClientApi.GiftMerchants[]>([]);

  const { handleFalse: handleClose, handleTrue: handleOpen, state: isOpen } = useToggle();
  const [searchParams, setSearchParams] = useSearchParams();
  const productIdFromQuery = searchParams.get('productId');

  const { state, handleSetDisplayedProducts } = useConnect();
  const { handleClick, isLastPage, slicedPosts } = useLazyPagination(
    state.products.displayedProducts,
    1,
    24
  );

  useEffect(() => {
    if (productIdFromQuery) {
      handleOpen();
    }
  }, [productIdFromQuery]);

  useEffect(() => {
    if (state.recipient.selectedCountry) {
      const filteredProducts = state.products.productList.filter(
        (product) => product.Country === state.recipient.selectedCountry?.Initials
      );

      setFilteredCountryData(filteredProducts || []);
      handleSetDisplayedProducts(filteredProducts);
    }
  }, [state.recipient.selectedCountry, state.products.productList]);

  useEffect(() => {
    if (state.categories.selectedCategory && filteredCountryData.length) {
      let filteredProducts: ClientApi.GiftMerchants[] = [];
      if (state.categories.selectedCategory.Category === 'All') {
        filteredProducts = filteredCountryData.filter(
          (product) => product.Country === state.recipient.selectedCountry?.Initials
        );
      } else {
        filteredProducts = filteredCountryData.filter(
          (product) => product.Category === state.categories.selectedCategory?.Category
        );
      }

      if (filteredProducts) {
        if (search) {
          const searchedItems = filteredProducts.filter((product) =>
            product.Name.toLowerCase().includes(search)
          );

          handleSetDisplayedProducts(searchedItems);
        } else {
          handleSetDisplayedProducts(filteredProducts);
        }
      }
    }
  }, [state.categories.selectedCategory, search, filteredCountryData]);

  const handleModalClose = useCallback(() => {
    // markPageAsClean();
    // markPageAsClean();
    handleClose();
    searchParams.delete('productId');
    // markPageAsClean();
    setSearchParams(searchParams);
    markPageAsClean();

    // navigate(Path.Connect);
  }, []);

  return (
    <Box className="ss-relative">
      {isConnectDataLoading && (
        <Box className="ss-absolute ss-pt-20 ss-z-10 ss-bg-white ss-top-0 ss-left-0 ss-bottom-0 ss-right-0 ss-opacity-70">
          <Loader ballSize="small" height="content" />
          <Text variant="paragraphLarge" className="ss-font-semibold ss-text-center">
            Loading...
          </Text>
        </Box>
      )}
      <Box className="ss-grid ss-grid-cols-2 xl:ss-grid-cols-3 ss-gap-5">
        {state.products.displayedProducts.length ? (
          <>
            {slicedPosts?.map((product) => (
              <ProductCard key={product.Id} item={product} />
            ))}
            {!isLastPage && (
              <Box className="ss-col-span-full ss-flex ss-justify-center ss-my-10">
                <Button label="Load more" variant="secondary" onClick={handleClick} />
              </Box>
            )}
          </>
        ) : null}
        {!state.products.displayedProducts.length && <EmptyGiftScreen />}
        <ProductDetails
          productIdFromQuery={productIdFromQuery}
          handleClose={handleModalClose}
          isOpen={isOpen}
          markPageAsClean={markPageAsClean}
        />
      </Box>
    </Box>
  );
};

export default ProductList;
