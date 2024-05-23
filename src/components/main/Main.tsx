import { Flex } from '@chakra-ui/react';
import Events from '../events/Events';
import Content from '../content/Content';
import Resources from '../resources/Resources';

function Main() {
    return (
        <Flex
            h="94%"
            p={2}
            direction={{ base: 'column', md: 'row' }}
        >
            <Flex order={{ base: 2, md: 1 }} flex="0.5">
                <Events />
            </Flex>
            <Flex order={{ base: 1, md: 2 }} flex="2">
                <Content />
            </Flex>
            <Flex order={{ base: 1, md: 3 }} flex="1">
                <Resources />
            </Flex>
        </Flex>
    );
}

export default Main;
