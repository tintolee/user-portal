import { Box, ButtonLink, Text } from '@sendsprint/ui-react';
import { PlusCircleOutline } from '@sendsprint/ui-react/dist/icons';
import { DisplayAmount, Image } from '@src/components';
import { useConnect } from '@src/contexts';
import { Path } from '@src/navigations/routes';
import ClientApi from '@src/types/client';
import { getCurrencySymbol } from '@src/utils';
import { getMonetaryValue } from '@src/utils/currency';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  item: ClientApi.GiftMerchants;
}

const ProductCard = ({ item }: Props) => {
  const { Name, Picture, Id, MinimumPrice, Country } = item;
  const [convertedAmount, setConvertedAmount] = useState(0);
  const { state } = useConnect();

  useEffect(() => {
    if (state.rate) {
      const formattedAmt = getMonetaryValue(MinimumPrice / state.rate.rate);
      setConvertedAmount(formattedAmt);
    }
  }, [state.rate]);

  const url = `${Path.Connect}?productId=${Id}`;

  return (
    <Box className="ss-rounded-lg ss-flex ss-flex-col ss-overflow-hidden">
      <Link to={url}>
        <Image
          alt=""
          imgClasses="ss-h-30 md:ss-h-60 lg:ss-h-54 ss-overflow-hidden ss-bg-neutral-400"
          src={Picture}
        />
      </Link>
      <Box className="ss-p-2 md:ss-p-6 ss-flex-1 ss-bg-white ss-flex ss-flex-col ss-justify-between">
        <Box>
          <Link to={url}>
            <Text variant="paragraphLarge" className="ss-font-bold ss-mb-1 ss-text-primary1-500">
              {Name}
            </Text>
          </Link>
          <Text variant="paragraphSmall" className="ss-text-neutral-400 ss-mb-2 ss-font-bold">
            From{' '}
            <DisplayAmount
              value={getMonetaryValue(MinimumPrice || 0)}
              currency={getCurrencySymbol(Country)}
              decimalScale={2}
            />{' '}
            (
            <DisplayAmount
              value={getMonetaryValue(convertedAmount)}
              currency={getCurrencySymbol(state.sender.selectedCountry?.initials)}
              decimalScale={2}
            />
            )
          </Text>
        </Box>
        <Box>
          <ButtonLink to={url} label="Buy now" variant="secondary" iconRight={PlusCircleOutline} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
