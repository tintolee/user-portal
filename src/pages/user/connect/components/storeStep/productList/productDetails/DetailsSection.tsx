import { Box, Button, Icon, Text } from '@sendsprint/ui-react';
import { CloseOutline } from '@sendsprint/ui-react/dist/icons';
import { DisplayAmount, Image } from '@src/components';
import { ConnectState } from '@src/contexts/connect-context/types';
import ClientApi from '@src/types/client';
import { getCurrencySymbol } from '@src/utils';
import { getMonetaryValue } from '@src/utils/currency';
import React, { useEffect, useState } from 'react';

interface Props {
  productDetails: ClientApi.GiftMerchants | null;
  state: ConnectState;
  handleClose: () => void;
}

const removeUnwantedText = (string: string) => {
  const fixedString = string.replaceAll('a??', "'");
  return fixedString;
};

const DetailsSection = ({ productDetails, state, handleClose }: Props) => {
  const [description, setDescription] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState<string[]>([]);
  const [convertedAmt, setConvertedAmt] = useState(0);

  useEffect(() => {
    if (productDetails) {
      const info = productDetails?.RedemptionDetails;

      const infoArr = info?.split(').');
      infoArr.shift();

      const infoArr2 = [];

      for (const item of infoArr) {
        let slicedItem = item.slice(0, item.length);
        if (slicedItem.includes('(')) {
          slicedItem = slicedItem.slice(0, slicedItem.lastIndexOf('('));
        }
        infoArr2.push(slicedItem);
      }

      setDeliveryInfo(infoArr2);

      const newDescription = removeUnwantedText(productDetails.Description);
      setDescription(newDescription);
    }
  }, [productDetails]);

  useEffect(() => {
    if (state.rate?.rate && productDetails?.MinimumPrice) {
      const roundedDownNo = getMonetaryValue(productDetails.MinimumPrice / state.rate?.rate);
      setConvertedAmt(roundedDownNo);
    }
  }, [state.rate?.rate, productDetails?.MinimumPrice]);

  return (
    <Box className="ss-w-full md:ss-w-350 lg:ss-w-500 ss-p-5 ss-pt-0 ss-h-max md:ss-h-full ss-bg-neutral-200 md:ss-overflow-y-auto">
      <Box className="ss-sticky ss-top-0 ss-pt-5 ss-bg-neutral-200">
        <Text className="ss-text-neutral-500 ss-block md:ss-hidden" variant="h5">
          Buy gift
        </Text>
        <Box className="ss-flex ss-justify-between ss-items-center ss-gap-3 ss-mb-6">
          <Box>
            <Text className="ss-text-primary1-500 ss-font-bold" variant="paragraphLarge">
              {productDetails?.Name}
            </Text>
            <Text variant="paragraphSmall" className="ss-text-neutral-400 ss-font-bold">
              From{' '}
              <DisplayAmount
                value={getMonetaryValue(productDetails?.MinimumPrice || 0)}
                currency={getCurrencySymbol(state.recipient.selectedCountry?.Initials)}
                decimalScale={2}
              />{' '}
              (
              <DisplayAmount
                value={getMonetaryValue(convertedAmt)}
                currency={getCurrencySymbol(state.sender.selectedCountry?.initials)}
                decimalScale={2}
              />
              )
            </Text>
          </Box>
          <Button
            onClick={handleClose}
            label={<Icon svg={CloseOutline} size={24} />}
            variant="tertiary"
            className="ss-p-0 ss-block md:ss-hidden"
          />
        </Box>
      </Box>
      <Image
        alt=""
        src={productDetails?.Picture || ''}
        imgClasses="ss-h-250 ss-rounded-lg ss-overflow-hidden ss-bg-neutral-400"
      />
      <Box className="ss-bg-white ss-p-4 ss-rounded-lg ss-mt-6">
        <Text className="ss-font-bold ss-text-neutral-500">Product Description</Text>
        {productDetails?.ShortDesc && <Text className="ss-my-2">{productDetails?.ShortDesc}</Text>}
        <Text className="ss-text-neutral-400" variant="paragraphSmall">
          {description}
        </Text>
      </Box>
      <Box className="ss-bg-white ss-p-4 ss-rounded-lg ss-mt-6">
        <Text className="ss-font-bold ss-text-neutral-500">Product Delivery Information</Text>
        {deliveryInfo.map((item, index) => (
          <Box key={index} className="ss-flex ss-mb-2">
            <Text variant="paragraphSmall" className="ss-mr-2 ss-w-5">
              {index + 1}
            </Text>
            <Text
              variant="paragraphSmall"
              className="ss-break-word ss-flex-1 ss-leading-10 ss-text-neutral-400">
              {item}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DetailsSection;
