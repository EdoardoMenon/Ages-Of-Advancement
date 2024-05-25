import { Flex } from '@chakra-ui/react';
import Event from './Event';

function Events() {
    return (
        <Flex
            w={{ base: '100%' }}
            minW={{ lg: '200px' }}
            p={2}
            justifyContent="space-between"
            gap={2}
            borderRight={{ md: 'solid 2px' }}
            borderColor={{ md: 'light-background.400' }}
        >
            <Flex direction="column" overflowY="auto" w="100%" gap={1} mr={2}>
                <Event
                    time="8:05"
                    color="assorted.red"
                    event="First Event  First Event  First Event  First Event  First Event  First Event  First Event"
                />
                <Event
                    time="8:05"
                    color="assorted.green"
                    event="Second Event  Second Event  Second Event  Second Event  Second Event  Second Event  Second Event"
                />
            </Flex>
        </Flex>
    );
}

export default Events;
