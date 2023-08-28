import ClientApi from '@src/types/client';
import React from 'react';
import Box from '@sendsprint/ui-react/dist/components/Box';
import cs from 'classnames';
import PercentBar from './PercentBar';
import { useTransferCard } from '../../hooks';
import CardBtns from './cardBtns';
import InfoBlock from './infoBlock';
import TransferCardHead from './transferCardHead';

interface Props {
  handleRetry: () => void;
  item: ClientApi.RecurringTransactionI;
  showBottomDetails?: boolean;
}

export interface CardData {
  currency: string;
  duration: number;
  interval: string;
  name: string;
  status: string;
}

const TransferCard = ({ handleRetry, item, showBottomDetails = true }: Props) => {
  const { RecipientName, SentCount, Duration, IsCompleted, CardType, DateCreated } = item;

  const {
    activateLoading,
    cancelLoading,
    cardDetails,
    handleActivate,
    handleCancel,
    handlePause,
    isLoading,
    name,
    pauseLoading,
    status,
    cardData
  } = useTransferCard({ handleRetry, item });

  return (
    <Box
      className={cs('ss-bg-white', {
        'ss-min-h-250 ss-rounded ss-shadow ss-p-5': showBottomDetails
      })}>
      <TransferCardHead
        item={item}
        cardData={cardData}
        isLoading={isLoading}
        name={name}
        status={status}
      />
      {!isLoading && cardData && (
        <PercentBar
          Duration={(Number(Duration) + 1).toString()}
          SentCount={SentCount}
          isCompleted={IsCompleted}
          status={cardData?.status}
        />
      )}
      {showBottomDetails && (
        <>
          <InfoBlock
            CardType={CardType}
            DateCreated={DateCreated}
            RecipientName={RecipientName}
            cardData={cardData}
            cardDetails={cardDetails}
            isLoading={isLoading}
          />
          <CardBtns
            IsCompleted={IsCompleted}
            activateLoading={activateLoading}
            cancelLoading={cancelLoading}
            cardData={cardData}
            handleActivate={handleActivate}
            handleCancel={handleCancel}
            handlePause={handlePause}
            isLoading={isLoading}
            pauseLoading={pauseLoading}
          />
        </>
      )}
    </Box>
  );
};

export default TransferCard;
