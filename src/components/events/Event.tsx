import { Text, TextProps } from '@chakra-ui/react';
import { formatTimestampToTime } from '../../helper/Helper';

interface Props extends TextProps {
  time: number;
  event: string;
}

function Event({ time, event, ...textProps }: Props) {
  return (
    <Text {...textProps} fontSize="xs">
      {formatTimestampToTime(time)} {event}
    </Text>
  );
}

export default Event;
