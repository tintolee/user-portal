import { Box, Form } from '@sendsprint/ui-react';
import { ConnectState } from '@src/contexts/connect-context/types';
import ClientApi from '@src/types/client';
import React, { useEffect, useState } from 'react';
import CategoryDropdown from './CategoryDropdown';
import MobileFilter from './MobileFilter';

interface Props {
  state: ConnectState;
  // eslint-disable-next-line no-unused-vars
  handleSetSelectedCategories: (payload: ClientApi.GiftCategories | undefined) => void;
}

const StoreFilters = ({ state, handleSetSelectedCategories }: Props) => {
  const [initialValues, setInitialValues] = useState({
    category: ''
  });

  useEffect(() => {
    setInitialValues({
      category: state.categories?.selectedCategory?.Category || ''
    });
  }, []);
  return (
    <Box>
      <Form enableReinitialize initialValues={initialValues} onSubmit={() => undefined}>
        <Box className="ss-hidden md:ss-block ss-w-300 lg:ss-min-w-300">
          <CategoryDropdown
            handleSetSelectedCategories={handleSetSelectedCategories}
            state={state}
          />
        </Box>
        <MobileFilter handleSetSelectedCategories={handleSetSelectedCategories} state={state} />
      </Form>
    </Box>
  );
};

export default StoreFilters;
