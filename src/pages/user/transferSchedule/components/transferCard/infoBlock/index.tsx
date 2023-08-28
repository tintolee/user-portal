import { Box, Skeleton, Text } from '@sendsprint/ui-react';
import React from 'react';
import { CardData } from '..';
import { formatDate, getImgSrc } from '../../../utils';
import InfoRow from '../infoRow';

interface Props {
  isLoading: boolean;
  cardData: CardData | undefined;
  RecipientName: string;
  DateCreated: string;
  CardType: string;
  cardDetails: string;
}

const InfoBlock = ({
  cardData,
  isLoading,
  RecipientName,
  DateCreated,
  CardType,
  cardDetails
}: Props) => {
  return (
    <>
      {isLoading && <Skeleton className="ss-h-32 ss-rounded ss-mb-4" />}
      {!isLoading && cardData && (
        <Box className="ss-bg-neutral-100 ss-p-4 ss-rounded-base ss-mt-5 ss-mb-4">
          <InfoRow label="Recipient" value={RecipientName} />
          <InfoRow label="Start date" value={formatDate(DateCreated)} />
          <InfoRow
            label="Payment method"
            value={
              <Text className="ss-text-color-475F84 ss-flex ss-items-center ss-gap-1">
                <img src={getImgSrc(CardType)} alt="" />
                <span>{cardDetails}</span>
              </Text>
            }
          />
        </Box>
      )}
    </>
  );
};

export default InfoBlock;
