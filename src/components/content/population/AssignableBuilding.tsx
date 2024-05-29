import { Button, Flex, Table, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import BuildableContainer from '../buildable/BuildableContainer';
import { ActiveBuilding, Buildings } from '../../../interfaces/Buildings';
import { capitaliseFirstLetter, splitCamelCase } from '../../../helper/Helper';
import { AllBuildingData } from '../../../static/BuildingData';
import { useContextSelector } from 'use-context-selector';
import { SaveDataContext } from '../../providers/save-data-provider/SaveDataProvider';

interface Props {
  buildingName: keyof Buildings;
}

function AssignableBuilding({ buildingName }: Props) {
  const building = useContextSelector(
    SaveDataContext,
    (s) => s.state.buildings[buildingName] as ActiveBuilding
  );
  const dispatch = useContextSelector(SaveDataContext, (s) => s.dispatch);

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
                AllBuildingData.get(buildingName)?.resourcesGained || {}
              ).map(([key, value]) => (
                <Tr key={key}>
                  <Td>
                    <Flex w="100%" justifyContent="space-between">
                      <Text>{capitaliseFirstLetter(key)}</Text>
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
            onClick={() =>
              dispatch({ type: 'decreaseRates', payload: buildingName })
            }
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
            onClick={() =>
              dispatch({ type: 'increaseRates', payload: buildingName })
            }
          >
            +
          </Button>
        </Flex>
      </BuildableContainer>
    );
}

export default AssignableBuilding;
