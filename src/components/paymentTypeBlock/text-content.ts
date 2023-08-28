import { IconProps } from '@sendsprint/ui-react';
import ClientApi from '@src/types/client';
import { Bank, CashPayment, InstantBankAccount, MobileMoney, VirtualBank } from './icons';

type ContentType = {
  title: string;
  body: string;
  icon: IconProps['svg'];
  hasNewBadge?: boolean;
};

const allTextContent: Record<ClientApi.RecipientType, ContentType> = {
  [ClientApi.RecipientType.NEW_NG_BANK]: {
    title: 'Bank Account',
    body: "The recipient's funds are deposited in naira into their naira bank account",
    icon: Bank
  },
  [ClientApi.RecipientType.NG_DOM]: {
    title: 'Domiciliary USD Bank Account',
    body: "The recipient's funds are deposited into their USD domiciliary bank account.",
    icon: Bank
  },
  [ClientApi.RecipientType.NG_V_DOM]: {
    title: 'Virtual Domiciliary USD Account',
    body: "The recipient's funds are deposited into a virtual USD domiciliary bank account that will be created for them.",
    icon: VirtualBank,
    hasNewBadge: true
  },
  /** auto dom */
  [ClientApi.RecipientType.NG_A_DOM]: {
    title: 'Instant USD Domiciliary Bank Account',
    body: "The recipient's funds are deposited into a USD domiciliary bank account that will be created for them.",
    icon: InstantBankAccount,
    hasNewBadge: true
  },
  [ClientApi.RecipientType.NG_CASH]: {
    title: 'Cash Pickup',
    body: 'The recipient picks up the cash from any of the designated bank’s branches.',
    icon: CashPayment
  },
  [ClientApi.RecipientType.GH_BANK]: {
    title: 'Bank Account',
    body: "The recipient's funds are deposited into their bank account.",
    icon: Bank
  },
  [ClientApi.RecipientType.GH_MOBILE]: {
    title: 'MoMo Mobile Money Account',
    body: "The recipient's funds are deposited into their Momo mobile money account.",
    icon: MobileMoney
  },
  [ClientApi.RecipientType.KE_BANK]: {
    title: 'Bank Account',
    body: "The recipient's funds are deposited into their bank account.",
    icon: Bank
  },
  [ClientApi.RecipientType.KE_MOBILE]: {
    title: 'Mpesa Mobile Money Account',
    body: "The recipient's funds are deposited into their Mpesa mobile money account.",
    icon: MobileMoney
  },
  [ClientApi.RecipientType.ZA_BANK]: {
    title: 'Bank Account',
    body: "The recipient's funds are deposited into their bank account.",
    icon: Bank
  }
};

const getTextContent = (method: ClientApi.RecipientType): ContentType => {
  return allTextContent[method];
};
export type { ContentType };
export default getTextContent;
