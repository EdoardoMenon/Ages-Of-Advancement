import { Button, Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import BuildableContainer from './BuildableContainer';
import { SaveDataContext } from '../../../contexts/SaveDataContext';

function Buildables() {
    const { gatherResource } = useContext(SaveDataContext);
    return (
        <Flex direction="column" gap={4}>
            <BuildableContainer headingName="Gathering">
                <Flex gap={4}>
                    <Button
                        variant="primary"
                        onClick={() => gatherResource('food')}
                    >
                        Gather Food
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => gatherResource('lumber')}
                    >
                        Gather Lumber
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => gatherResource('stone')}
                    >
                        Gather Stone
                    </Button>
                </Flex>
            </BuildableContainer>
            <BuildableContainer headingName="Houses">
                <Flex gap={4}>
                    <Button variant="primary">Common House</Button>
                </Flex>
            </BuildableContainer>
        </Flex>
    );
}

export default Buildables;
