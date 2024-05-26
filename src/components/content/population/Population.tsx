import { Flex } from '@chakra-ui/react';
import AssignableBuilding from './AssignableBuilding';

function Population() {
    return (
        <Flex gap={4}>
            <AssignableBuilding buildingName="lumbermill" />
            <AssignableBuilding buildingName="stoneQuarry" />
            <AssignableBuilding buildingName="farm" />
        </Flex>
    );
}

export default Population;
