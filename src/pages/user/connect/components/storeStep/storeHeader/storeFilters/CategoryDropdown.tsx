import { FormFieldDropdown } from '@sendsprint/ui-react';
import { ConnectState } from '@src/contexts/connect-context/types';
import ClientApi from '@src/types/client';
import { useField } from 'formik';
import React, { useEffect } from 'react';

interface Props {
  state: ConnectState;
  // eslint-disable-next-line no-unused-vars
  handleSetSelectedCategories: (payload: ClientApi.GiftCategories | undefined) => void;
}

const CategoryDropdown = ({ state, handleSetSelectedCategories }: Props) => {
  const [{ value }, , { setValue }] = useField('category');

  useEffect(() => {
    if (!state.categories.selectedCategory && value) {
      handleSetSelectedCategories({ Category: 'All' });
      setValue('');
    }
  }, [state.categories.selectedCategory, value]);

  useEffect(() => {
    if (state.recipient.selectedCountry?.Initials) {
      setValue('All');
    }
  }, [state.recipient.selectedCountry]);

  useEffect(() => {
    if (value && state.categories.categoryList.length) {
      const filteredCategory = state.categories.categoryList.find(
        (category) => category.Category === value
      );

      if (filteredCategory) {
        handleSetSelectedCategories(filteredCategory);
      } else {
        handleSetSelectedCategories({ Category: 'All' });
      }
    } else if (value && !state.categories.categoryList.length) {
      handleSetSelectedCategories({ Category: 'All' });
    }
    // else {
    //   handleSetSelectedCategories(undefined);
    // }
  }, [value, state.categories.categoryList]);

  useEffect(() => {
    if (state.categories.selectedCategory) {
      setValue(state.categories.selectedCategory.Category);
    }
  }, [state.categories.selectedCategory]);

  return (
    <FormFieldDropdown
      data={state.categories.categoryList}
      optionLabel="Category"
      emptyOptionLabel=""
      name="category"
      optionValue="Category"
      label="Gift category"
    />
  );
};

export default CategoryDropdown;
