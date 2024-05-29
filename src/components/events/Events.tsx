import { Flex } from '@chakra-ui/react';
import Event from './Event';
import { SaveDataContext } from '../providers/save-data-provider/SaveDataProvider';
import { useContextSelector } from 'use-context-selector';

function Events() {
  const events = useContextSelector(SaveDataContext, (s) => s.state.events);

  return (
    <Flex
      w={{ base: '100%' }}
      minW={{ lg: '200px' }}
      p={2}
      justifyContent="space-between"
      gap={2}
      borderRight={{ md: 'solid 2px' }}
      borderColor={{ md: 'light-background.400' }}
      overflowY="auto"
    >
      <Flex direction="column" overflowY="auto" w="100%" gap={1} mr={2}>
        {events.length > 0 &&
          events.map((event, index) => (
            <Event
              key={index}
              time={event.timestamp}
              color={event.color}
              event={event.text}
            />
          ))}
      </Flex>
    </Flex>
  );
}

export default Events;
