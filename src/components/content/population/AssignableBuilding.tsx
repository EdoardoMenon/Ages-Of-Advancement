import { Button, Flex, Table, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import BuildableContainer from '../buildable/BuildableContainer';
import { ActiveBuilding, Buildings } from '../../../interfaces/Buildings';
import { capitaliseFirstLetter, splitCamelCase } from '../../../helper/Helper';
import { useContext } from 'react';
import { SaveDataContext } from '../../../contexts/SaveDataContext';
import { AllBuildingData } from '../../../static/BuildingData';

interface Props {
    buildingName: keyof Buildings;
}

function AssignableBuilding({ buildingName }: Props) {
    const { saveData, increaseRates, decreaseRates } =
        useContext(SaveDataContext);
    const building = saveData.buildings[buildingName] as ActiveBuilding;

    if (building.assigned === undefined) return;
    if (building.owned > 0)
        return (
            <BuildableContainer
                headingName={splitCamelCase(buildingName)}
                centeredHeading
            >
                <Flex direction="column" w="12em">
                    <Table variant="smallStriped">
                        <Tbody>
                            {Object.entries(
                                AllBuildingData.get(buildingName)
                                    ?.resourcesGained || {}
                            ).map(([key, value]) => (
                                <Tr key={key}>
                                    <Td>
                                        <Flex
                                            w="100%"
                                            justifyContent="space-between"
                                        >
                                            <Text>
                                                {capitaliseFirstLetter(key)}
                                            </Text>
                                            <Text>{value}/s</Text>
                                        </Flex>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Flex>
                <Flex w="100%">
                    <Button
                        h="100%"
                        variant="primary"
                        borderTopRightRadius="0"
                        borderBottomRightRadius="0"
                        onClick={() => decreaseRates(buildingName)}
                    >
                        -
                    </Button>
                    <Flex
                        alignItems="center"
                        justifyContent="center"
                        p={2}
                        border="solid white 2px"
                        borderRight="none"
                        borderLeft="none"
                        w="100%"
                    >
                        <Text>
                            {building.assigned}/{building.owned}
                        </Text>
                    </Flex>
                    <Button
                        h="100%"
                        variant="primary"
                        borderTopLeftRadius="0"
                        borderBottomLeftRadius="0"
                        onClick={() => increaseRates(buildingName)}
                    >
                        +
                    </Button>
                </Flex>
            </BuildableContainer>
        );
}

export default AssignableBuilding;
