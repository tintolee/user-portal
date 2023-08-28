import { Box, Icon, IconProps, Text } from '@sendsprint/ui-react';

interface Props {
  title: string;
  value: string;
  icon: IconProps['svg'];
}

const InfoBlock = ({ icon, title, value }: Props) => {
  if (!value) return null;

  return (
    <Box className="ss-flex ss-gap-4 ss-pl-4 ss-text-primary1-300">
      <Box>
        <Icon size={24} svg={icon} />
      </Box>
      <Box className="ss-pt-1">
        <Text className="ss-font-bold ss-mb-2">{title}</Text>
        <Text className="ss-text-primary1-500 ss-break-all">{value}</Text>
      </Box>
    </Box>
  );
};

export default InfoBlock;
