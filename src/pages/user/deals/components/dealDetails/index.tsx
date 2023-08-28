import Box from '@sendsprint/ui-react/dist/components/Box';
import Button from '@sendsprint/ui-react/dist/components/Button';
import { Icon } from '@sendsprint/ui-react/dist/components/Icon';
import Text from '@sendsprint/ui-react/dist/components/Text';
import CopyOutline from '@sendsprint/ui-react/dist/icons/CopyOutline';
import CloseOutline from '@sendsprint/ui-react/dist/icons/CloseOutline';
import { Dialog2, Image } from '@src/components';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { deals, giftcard } from '../../assets';
import { DealI } from '../dealsGrid/DealBox';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  data: DealI[];
  idQuery: string | null;
}

const DealDetails = ({ handleClose, isOpen, data, idQuery }: Props) => {
  const [selectedData, setSelectedData] = useState<DealI | null>(null);

  useEffect(() => {
    if (idQuery && data.length) {
      const filtered = data.find((item) => item.id === idQuery);

      if (filtered) {
        setSelectedData(filtered);
      }
    }
  }, [idQuery, data]);

  const discountCode = selectedData?.discountCode;
  const dealInfo = selectedData?.dealInfo || [];
  const redemptionInfo = selectedData?.redemptionInfo || [];

  return (
    <Dialog2 handleClose={handleClose} isOpen={isOpen}>
      <Box className="ss-flex ss-justify-between ss-mb-6 ss-items-center">
        <Text className="ss-text-neutral-500" variant="h5">
          {selectedData?.merchantName}
        </Text>
        <Button
          onClick={handleClose}
          label={<Icon svg={CloseOutline} size={24} />}
          variant="tertiary"
          className="ss-p-0"
        />
      </Box>
      <Box className="ss-bg-white ss-rounded-lg ss-p-4 ss-mb-6">
        <Text className="ss-text-neutral-400 ss-font-normal">
          {selectedData?.merchantDescription}
        </Text>
      </Box>
      <Box className="ss-mb-8">
        <Image
          alt=""
          imgClasses="ss-h-300 ss-rounded-lg"
          className="ss-h-full ss-object-cover"
          src={deals}
        />
      </Box>
      <Box className="ss-p-5 ss-space-y-5 ss-max-w-400 ss-mx-auto ss-border ss-border-dashed ss-border-success-500 ss-rounded-lg">
        {dealInfo.map((item, index) => (
          <Box key={index} className="ss-flex ss-gap-3">
            <Image
              alt=""
              src={giftcard}
              className="ss-mt-1 ss-w-6 ss-h-6"
              imgClasses="ss-w-full ss-object-contain"
            />
            <Text className="ss-flex-1" variant="paragraphSmall">
              {item}
            </Text>
          </Box>
        ))}
        {/* <Box className="ss-flex ss-gap-3">
          <Image
            alt=""
            src={clock}
            className="ss-mt-1 ss-w-6 ss-h-6"
            imgClasses="ss-w-full ss-object-contain"
          />
          <Text className="ss-flex-1" variant="paragraphSmall">
            You get 20% off your next shipping to nigeria offered to you in paternership with Apo
          </Text>
        </Box> */}
      </Box>
      <Box className="ss-mb-8">
        <Text
          className="ss-text-center ss-text-neutral-400 ss-mt-8 ss-mb-5"
          variant="paragraphSmall">
          To redeem this reward;
        </Text>
        <Box className="ss-space-y-1">
          {redemptionInfo.map((item, index) => (
            <Box key={index} className="ss-flex ss-items-center ss-max-w-350 ss-mx-auto ss-gap-3">
              <Box className="ss-w-2 ss-h-2 ss-bg-black ss-rounded-full" />
              <Text
                variant="paragraphSmall"
                className="ss-text-neutral-400 ss-flex-1"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box className="ss-bg-white ss-max-w-400 ss-mx-auto ss-rounded-lg ss-py-6 ss-px-4">
        <Text variant="paragraphSmall" className="ss-text-neutral-400 ss-text-center">
          Your discount code
        </Text>
        <Box className="ss-flex ss-justify-center ss-items-center ss-gap-3">
          <Text variant="paragraphLarge" className="ss-font-bold">
            {discountCode}
          </Text>
          <CopyToClipboard text={discountCode || ''}>
            <button className="focus:ss-focus-ring ss-rounded-full">
              <Icon svg={CopyOutline} />
            </button>
          </CopyToClipboard>
        </Box>
      </Box>
    </Dialog2>
  );
};

export default DealDetails;
