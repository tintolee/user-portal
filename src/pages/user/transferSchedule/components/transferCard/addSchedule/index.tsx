import { Text } from '@sendsprint/ui-react';
import { Path } from '@src/navigations/routes';
import { Link } from 'react-router-dom';

const AddSchedule = () => {
  return (
    <Link to={Path.SendMoney}>
      <button className="focus:ss-focus-ring ss-rounded ss-border ss-border-dashed ss-border-primary-100 ss-w-full ss-flex ss-justify-center ss-items-center ss-min-h-250">
        <Text className="ss-text-primary-100 ss-font-bold">Add a transfer schedule</Text>
      </button>
    </Link>
  );
};

export default AddSchedule;
