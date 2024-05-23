import { Box, Flex } from '@chakra-ui/react'
import Event from './Event'

function Events() {
    return (
        <Flex w={{ base: '100%' }} justifyContent="space-between" gap={2}>
            <Flex direction="column" overflowY="auto" w="100%" gap={1}>
                <Event time="8:05" color="assorted.red" event="First Event  First Event  First Event  First Event  First Event  First Event  First Event" />
                <Event time="8:05" color="assorted.green" event="Second Event  Second Event  Second Event  Second Event  Second Event  Second Event  Second Event" />
            </Flex>
            <Box w="2px" h="100%" className="vertical-line" visibility={{ base: 'hidden', md: 'visible' }} />
        </Flex>
    )
}

export default Events