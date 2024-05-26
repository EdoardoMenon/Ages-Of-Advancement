import { Flex, Text } from '@chakra-ui/react';
import { Buildings } from '../../../interfaces/Buildings';
import {
    calculateScalingBuildingCost,
    canAfford,
    capitaliseFirstLetter,
} from '../../../helper/Helper';
import { useContext } from 'react';
import { SaveDataContext } from '../../../contexts/SaveDataContext';
import { Resources } from '../../../interfaces/Resources';
import { AllBuildingData } from '../../../static/BuildingData';

interface Props {
    description: string;
    buildingName: keyof Buildings;
}

function BuildingPopup({ description, buildingName }: Props) {
    const { saveData } = useContext(SaveDataContext);

    const buildingData = AllBuildingData.get(buildingName);

    if (!buildingData) {
        return null;
    }

    return (
        <Flex
            direction="column"
            maxW="200px"
            gap={4}
            alignItems="flex-start"
            p={2}
        >
            <Text textAlign="left">{description}</Text>
            <Flex direction="column" alignContent="flex-start" w="100%">
                <Text mb={2}>Costs:</Text>
                {Object.entries(buildingData.costs).map(([key, value]) => {
                    const resourceKey = key as keyof Resources;
                    const scaledCost = calculateScalingBuildingCost(
                        value,
                        saveData.buildings[buildingName].rateGrowth,
                        saveData.buildings[buildingName].owned
                    );
                    return (
                        <Text
                            key={key}
                            textAlign="left"
                            color={
                                canAfford(
                                    resourceKey,
                                    scaledCost,
                                    saveData.resources
                                )
                                    ? 'assorted.green'
                                    : 'assorted.red'
                            }
                        >
                            {capitaliseFirstLetter(key)}: {scaledCost}
                        </Text>
                    );
                })}
            </Flex>
            <Flex direction="column" alignContent="flex-start" w="100%">
                <Text mb={2}>Benefits:</Text>
                {Object.entries(buildingData.benefits).map(([key, value]) => (
                    <Text key={key} textAlign="left">
                        {capitaliseFirstLetter(key)}: {value}
                    </Text>
                ))}
            </Flex>
        </Flex>
    );
}

export default BuildingPopup;
