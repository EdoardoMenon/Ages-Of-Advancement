import { Flex, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
    headingName: string;
    children: ReactNode;
}

function BuildableContainer({ headingName, children }: Props) {
    return (
        <Flex
            p={3}
            border="solid 2px"
            borderColor="light-background.200"
            borderRadius="md"
            alignItems="flex-start"
            backgroundColor="light-background.500"
            direction="column"
            gap={4}
        >
            <Heading as="h3" size="md">
                {headingName}
            </Heading>
            {children}
        </Flex>
    );
}

export default BuildableContainer;
