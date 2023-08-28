import { Box, Text } from '@sendsprint/ui-react';
import { CloseBtn, Dialog2 } from '@src/components';
import { useToasts } from '@src/contexts';
import { useDeleteRecipientById, useGetRecipientById } from '@src/hooks';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import DetailsInfo from './DetailsInfo';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  refetchRecipients: () => void;
}

const RecipientDetails = ({ handleClose, isOpen, refetchRecipients }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const idFromQuery = searchParams.get('id');
  const { addToast } = useToasts();

  const { data, isFetching } = useGetRecipientById(
    {
      id: idFromQuery || ''
    },
    {
      enabled: !!idFromQuery
    }
  );

  const { mutate, isLoading } = useDeleteRecipientById({
    onSuccess: () => {
      handleCloseModal();
      addToast(
        {
          title: 'Recipient deleted',
          body: "The recipient's details was deleted successfully"
        },
        { appearance: 'success' }
      );
      refetchRecipients();
    }
  });

  const handleDeleteRecipient = () => {
    mutate({
      id: idFromQuery || ''
    });
  };

  const handleCloseModal = () => {
    searchParams.delete('id');
    setSearchParams(searchParams);
    handleClose();
  };
  return (
    <Dialog2 isOpen={isOpen} handleClose={handleCloseModal}>
      <Box className="ss-flex ss-justify-between ss-mb-6 ss-items-center">
        <Text className="ss-text-neutral-500" variant="h5">
          Recipient&apos;s Details
        </Text>
        <CloseBtn onClick={handleCloseModal} />
      </Box>
      <DetailsInfo
        isDeleteLoading={isLoading}
        handleDeleteRecipient={handleDeleteRecipient}
        data={data}
        isLoading={isFetching}
        handleClose={handleCloseModal}
      />
    </Dialog2>
  );
};

export default RecipientDetails;
