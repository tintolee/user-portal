import Box from '@sendsprint/ui-react/dist/components/Box';
import Text from '@sendsprint/ui-react/dist/components/Text';
import { useGetRecipients } from '@src/hooks/queries/recipient';
import { Path } from '@src/navigations/routes';
import ClientApi from '@src/types/client';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipientsContent from './recipientsContent';

const RecentRecipientsInner = () => {
  const { data: recipients = [], isSuccess, isLoading, isError, refetch } = useGetRecipients();
  const [slicedRecipients, setSlicedRecipients] = useState<ClientApi.Recipient[]>([]);

  useEffect(() => {
    if (recipients.length) {
      setSlicedRecipients(recipients.slice(0, 4));
    }
  }, [recipients]);

  return (
    <Box className="ss-bg-white ss-p-3 ss-py-4 md:ss-p-6 ss-rounded-lg">
      <Box className="ss-flex ss-items-center ss-mb-3 ss-justify-between">
        <Text className="ss-font-semibold" variant="paragraphLarge">
          Recent recipients
        </Text>
        {isSuccess && slicedRecipients.length ? (
          <Link
            to={Path.Recipients}
            className="ss-text-primary1-500 ss-text-paragraph-small ss-underline">
            See all recipients
          </Link>
        ) : null}
      </Box>
      <Box>
        <RecipientsContent
          isError={isError}
          isLoading={isLoading}
          recipients={slicedRecipients}
          refetch={refetch}
        />
      </Box>
    </Box>
  );
};

export default RecentRecipientsInner;
