import { useMixpanel } from '@src/contexts';
import { useFormikContext } from 'formik';
import { Dict } from 'mixpanel-browser';
import { useEffect, useState } from 'react';

interface TrackTypingProps {
  event: string;
  options?: Dict | undefined;
}

const TrackTyping: React.FC<TrackTypingProps> = ({ event, options }) => {
  const formik = useFormikContext();
  const { mixpanelInstance } = useMixpanel();
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (formik.dirty) {
      if (isDirty) {
        return;
      }

      mixpanelInstance.track(event, options);
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [event, formik.dirty, isDirty, mixpanelInstance, options]);

  return <></>;
};

export default TrackTyping;
