import { Flex, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { capitaliseFirstLetter } from '../../../helper/Helper';

interface Props {
    headingName: string;
    children: ReactNode;
    centeredHeading?: boolean;
}

function BuildableContainer({ headingName, children, centeredHeading }: Props) {
    return (
        <Flex
            p={3}
            border="solid 2px"
            borderColor="light-background.200"
            borderRadius="md"
            alignItems={centeredHeading ? 'center' : 'flex-start'}
            backgroundColor="light-background.500"
            direction="column"
            gap={4}
        >
            <Heading as="h3" size="md">
                {capitaliseFirstLetter(headingName)}
            </Heading>
            {children}
        </Flex>
    );
}

export default BuildableContainer;
