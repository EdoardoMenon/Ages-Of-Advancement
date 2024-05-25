import { Flex } from '@chakra-ui/react';
import Events from '../events/Events';
import Content from '../content/Content';
import Resources from '../resources/Resources';

function Main() {
    return (
        <Flex h="95%" direction={{ base: 'column', lg: 'row' }}>
            <Flex order={{ base: 2, lg: 1 }} flex="0.5">
                <Events />
            </Flex>
            <Flex order={{ base: 1, lg: 2 }} flex="2">
                <Content />
            </Flex>
            <Flex order={{ base: 1, lg: 3 }} flex="1" alignItems="flex-start">
                <Resources />
            </Flex>
        </Flex>
    );
}

export default Main;
