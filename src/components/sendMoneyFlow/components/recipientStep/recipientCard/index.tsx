import React, { FC } from 'react';
import cs from 'classnames';
import { Icon } from '@sendsprint/ui-react';
import { ArrowIosForwardOutline } from '@sendsprint/ui-react/dist/icons';
import { noop } from '@sendsprint/ui-react/dist/utils';
import ClientApi from '@src/types/client';
import { CurrencyTag, DisplayPhoneNumber } from '@src/components';
import RecipientUserInfo from './RecipientUserInfo';
import ResolveBankName from './ResolveBankName';
import ResolveBankBranchName from './ResolveBankBranchName';
import ExpandedItem, { ExpandedItemSubTitle } from './ExpandedItem';

type RecipientCardProps = {
  recipient: ClientApi.Recipient;
  isSelectable?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (recipient: ClientApi.Recipient) => void;
  showAddress?: boolean;
};

const RecipientCard: FC<RecipientCardProps> = ({
  recipient,
  isSelectable = false,
  onSelect = noop,
  showAddress = false
}) => {
  const ContactInfo = (
    <>
      {recipient.email ||
        (recipient.phoneNumber && (
          <DisplayPhoneNumber country={recipient.country} phoneNumber={recipient.phoneNumber} />
        )) ||
        null}
      {showAddress && recipient.address ? <div>{recipient.address}</div> : null}
    </>
  );

  /**
   * Expanded mode is when bank code and account number exists.
   * Please remember that we use bank code as mobile operator for Ghana Mobile Money recipients
   */
  const isExpanded = recipient.bankCode && recipient.accountNumber;

  const onSelectHandler = () => {
    onSelect(recipient);
  };
  return (
    <div className="ss-relative ss-p-3 ss-py-4 md:ss-p-6 ss-bg-white ss-rounded focus-within:ss-focus-ring focus-within:ss-border-primary1-100">
      <div className="ss-flex ss-items-center">
        <RecipientUserInfo
          className="ss-flex-grow"
          fullName={recipient.fullName}
          subtitle={!isSelectable && ContactInfo}
        />

        {!isExpanded && (
          <CurrencyTag
            className={cs({
              'ss-self-start': !isSelectable,
              'ss-mr-8': isSelectable
            })}
            variant="pill"
            countryInitials={recipient.country}
          />
        )}

        {isSelectable && (
          <Icon
            svg={ArrowIosForwardOutline}
            size={24}
            className="ss-text-primary-100 ss-rounded-full ss-leading-none ss-bg-neutral-5 ss-p-2"
          />
        )}
      </div>

      {isExpanded && (
        <div className="ss-rounded ss-bg-neutral-100 ss-p-2 ss-mt-4 ss-flex ss-flex-wrap ss-text-neutral-60">
          {recipient.bankCode && (
            <ExpandedItem isSelectable={isSelectable} title="Bank">
              <ExpandedItemSubTitle>
                <ResolveBankName code={recipient.bankCode} country={recipient.country} />
              </ExpandedItemSubTitle>
            </ExpandedItem>
          )}

          {recipient.accountNumber && (
            <ExpandedItem isSelectable={isSelectable} title="Account number">
              <ExpandedItemSubTitle>{recipient.accountNumber}</ExpandedItemSubTitle>
            </ExpandedItem>
          )}

          {recipient.branchCode && (
            <ExpandedItem isSelectable={isSelectable} title="Bank branch">
              <ExpandedItemSubTitle>
                <ResolveBankBranchName
                  country={recipient.country}
                  bankCode={recipient.bankCode}
                  branchCode={recipient.branchCode}
                />
              </ExpandedItemSubTitle>
            </ExpandedItem>
          )}

          {recipient.routingNumber && (
            <ExpandedItem isSelectable={isSelectable} title="Routing number">
              <ExpandedItemSubTitle>{recipient.routingNumber}</ExpandedItemSubTitle>
            </ExpandedItem>
          )}

          <ExpandedItem isSelectable={isSelectable} title="Currency">
            <CurrencyTag countryInitials={recipient.country} />
          </ExpandedItem>
        </div>
      )}
      {isSelectable && (
        <button
          className="ss-absolute ss-inset-0 ss-block ss-w-full ss-bg-transparent ss-rounded ss-border-0 focus:ss-outline-none"
          onClick={onSelectHandler}>
          <span className="ss-sr-only">Select {recipient.fullName}</span>
        </button>
      )}
    </div>
  );
};

export type { RecipientCardProps };
export default RecipientCard;
