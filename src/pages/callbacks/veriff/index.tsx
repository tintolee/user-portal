import { useVeriffStatus } from '@src/hooks';
import { VeriffFailure, VeriffPending, VeriffSuccess } from './components';
import { useAccount, useDashboardContext } from '@src/contexts';
import { useEffect, useState } from 'react';
import { GeneralLayout } from '@src/layouts';
import { DURATION_5_SEC } from '@src/constants';
import { Box } from '@sendsprint/ui-react';

const Veriff = () => {
  const { user } = useAccount();
  const { veriffUrl, handleVeriffSameTab } = useDashboardContext();
  const [status, setStatus] = useState<'pending' | 'verified' | 'failed'>('pending');
  const { data } = useVeriffStatus(
    {
      email: user?.email || ''
    },
    {
      refetchInterval: DURATION_5_SEC
    }
  );

  useEffect(() => {
    if (data) {
      setStatus('verified');
    }
  }, [data]);

  const handleRemoveData = () => {
    window.close();
  };

  return (
    <GeneralLayout pageTitle="Veriff Status">
      <Box className="ss-flex ss-justify-center">
        {status === 'pending' && <VeriffPending />}
        {status === 'failed' && (
          <VeriffFailure
            handleVeriff={handleVeriffSameTab}
            handleRemoveData={handleRemoveData}
            url={veriffUrl}
          />
        )}
        {status === 'verified' && <VeriffSuccess handleRemoveData={handleRemoveData} />}
      </Box>
    </GeneralLayout>
  );
};

export default Veriff;
