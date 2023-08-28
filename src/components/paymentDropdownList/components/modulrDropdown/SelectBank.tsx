import { Box, Text } from '@sendsprint/ui-react';
import CloseBtn from '@src/components/closeBtn';
import Image from '@src/components/image';
import Dialog2 from '@src/components/dialog2';
import ClientApi from '@src/types/client';
import React from 'react';
import { ModulrBankScotland, ModulrLloyd } from '../../assets';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import cs from 'classnames';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  modulrBanks: ClientApi.Banks.GetModulrBanks.ModulrBankI[];
  // eslint-disable-next-line no-unused-vars
  handleModulrBankClick: (id: string) => void;
  checkPinLoading: boolean;
  selectedModulrBank: string;
}

type ModulrBanksI = 'Lloyds' | 'Royal Bank of Scotland';

const resolveModulrBanksImg = (bankName: ModulrBanksI) => {
  if (bankName === 'Royal Bank of Scotland') return ModulrBankScotland;

  return ModulrLloyd;
};

const SelectBank = ({
  isOpen,
  handleClose,
  modulrBanks,
  checkPinLoading,
  handleModulrBankClick,
  selectedModulrBank
}: Props) => {
  return (
    <Dialog2 disableOverlayClick isOpen={isOpen} handleClose={handleClose}>
      <Box className="ss-flex ss-justify-between ss-mb-6 ss-items-center">
        <Text className="ss-text-neutral-500" variant="h5">
          Select your bank
        </Text>
        <CloseBtn onClick={handleClose} />
      </Box>
      <Box>
        <Text variant="paragraphLarge" className="ss-mb-10">
          You’ll be securely redirected to your bank to authenticate this payment
        </Text>
        <Box className="ss-grid ss-grid-cols-3 ss-gap-4">
          {modulrBanks.map((item) => (
            <button
              type="button"
              onClick={() => handleModulrBankClick(item.id)}
              className="ss-bg-white ss-overflow-hidden ss-relative ss-h-40 ss-p-3 focus:ss-focus-ring ss-rounded-lg ss-flex ss-justify-center ss-items-center"
              key={item.id}>
              <Image alt="" src={resolveModulrBanksImg(item.name as ModulrBanksI)} />
              <Box
                className={cs(
                  'ss-absolute ss-flex ss-items-center ss-justify-center ss-top-0 ss-left-0 ss-right-0 ss-bottom-0 ss-bg-black ss-bg-opacity-60',
                  {
                    'ss-block': checkPinLoading && item.id === selectedModulrBank,
                    'ss-hidden': !(checkPinLoading && item.id === selectedModulrBank)
                  }
                )}>
                <AiOutlineLoading3Quarters size={40} className="ss-animate-spin ss-text-white" />
              </Box>
            </button>
          ))}
        </Box>
      </Box>
    </Dialog2>
  );
};

export default SelectBank;
