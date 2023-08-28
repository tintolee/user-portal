import { Box, Button, Skeleton } from '@sendsprint/ui-react';
import React from 'react';
import { FiPlay, FiPause } from 'react-icons/fi';
import { CardData } from '..';
import CancelDialog from '../cancelDialog';

interface Props {
  isLoading: boolean;
  cardData: CardData | undefined;
  IsCompleted: 0 | 1;
  handlePause: () => void;
  handleActivate: () => void;
  handleCancel: () => void;
  pauseLoading: boolean;
  activateLoading: boolean;
  cancelLoading: boolean;
}

const CardBtns = ({
  cardData,
  isLoading,
  handlePause,
  IsCompleted,
  pauseLoading,
  activateLoading,
  cancelLoading,
  handleActivate,
  handleCancel
}: Props) => {
  return (
    <>
      {isLoading && <Skeleton className="ss-h-10 ss-rounded" />}
      {!isLoading && cardData?.status && cardData?.status !== 'Cancelled' && IsCompleted !== 1 && (
        <Box className="ss-flex ss-justify-end ss-items-center ss-gap-2">
          {cardData?.status.toLowerCase() === 'active' && (
            <Button
              label="Pause"
              onClick={handlePause}
              disabled={pauseLoading}
              icon={FiPause}
              variant="primary"
              className="ss-py-2"
            />
          )}
          {cardData?.status.toLowerCase() === 'paused' && (
            <Button
              onClick={handleActivate}
              disabled={activateLoading}
              className="ss-py-2"
              label="Resume"
              icon={FiPlay}
              variant="primary"
            />
          )}
          <CancelDialog isLoading={cancelLoading} handleCancel={handleCancel} />
        </Box>
      )}
    </>
  );
};

export default CardBtns;
