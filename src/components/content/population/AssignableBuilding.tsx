import { Flex, Table, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import BuildableContainer from '../buildable/BuildableContainer';
import { Buildings } from '../../../interfaces/Buildings';
import { AllStaticRates } from '../../../static/StaticRates';
import { capitaliseFirstLetter } from '../../../helper/Helper';

interface Props {
    buildingName: keyof Buildings;
}

function AssignableBuilding({ buildingName }: Props) {
    return (
        <BuildableContainer headingName={buildingName} centeredHeading>
            <Flex direction="column" w="12em">
                <Table variant="smallStriped">
                    <Tbody>
                        <Tr>
                            <Td>
                                <Flex w="100%" justifyContent="space-between">
                                    {AllStaticRates.buildings[buildingName].map(
                                        (buildingInfo) => (
                                            <>
                                                <Text>
                                                    {capitaliseFirstLetter(
                                                        buildingInfo.resource
                                                    )}
                                                </Text>
                                                <Text>
                                                    {buildingInfo.rate}/s
                                                </Text>
                                            </>
                                        )
                                    )}
                                </Flex>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Flex>
        </BuildableContainer>
    );
}

export default AssignableBuilding;
