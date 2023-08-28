import { FormField } from '@sendsprint/ui-react';
import { InboxOutline } from '@sendsprint/ui-react/dist/icons';
import { getPostCodeLabel } from '@src/utils/address';
import { useField } from 'formik';
import React from 'react';

const PostCodeField = () => {
  const [{ value: country }] = useField('country');

  const postCodeLabel = getPostCodeLabel(country);
  return <FormField icon={InboxOutline} label={postCodeLabel} name="postCode" />;
};

export default PostCodeField;
