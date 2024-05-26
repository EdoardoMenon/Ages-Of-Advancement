import { Flex } from '@chakra-ui/react';

import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

function ResearchContainer({ children }: Props) {
    return (
        <Flex
            p={3}
            border="solid 2px"
            borderColor="light-background.200"
            borderRadius="md"
            backgroundColor="light-background.500"
            gap={4}
        >
            {children}
        </Flex>
    );
}

export default ResearchContainer;
