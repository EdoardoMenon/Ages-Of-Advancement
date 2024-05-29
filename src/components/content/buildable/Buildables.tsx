import { Button, Flex } from '@chakra-ui/react';
import BuildableContainer from './BuildableContainer';
import BuildableButton from './BuildableButton';
import { Buildings } from '../../../interfaces/Buildings';
import { useContextSelector } from 'use-context-selector';
import { SaveDataContext } from '../../providers/save-data-provider/SaveDataProvider';

function Buildables() {
  const buildings = useContextSelector(
    SaveDataContext,
    (s) => s.state.buildings
  );
  const dispatch = useContextSelector(SaveDataContext, (s) => s.dispatch);

  const showHousesCategory = Object.values(buildings).some(
    (building) => building.category === 'houses' && !building.isHidden
  );

  const showResearchCategory = Object.values(buildings).some(
    (building) => building.category === 'research' && !building.isHidden
  );

  const showProductionCategory = Object.values(buildings).some(
    (building) => building.category === 'production' && !building.isHidden
  );

  const houseBuildings = Object.keys(buildings).filter(
    (buildingName) =>
      buildings[buildingName as keyof Buildings].category === 'houses'
  );

  const productionBuildings = Object.keys(buildings).filter(
    (buildingName) =>
      buildings[buildingName as keyof Buildings].category === 'production'
  );

  const researchBuildings = Object.keys(buildings).filter(
    (buildingName) =>
      buildings[buildingName as keyof Buildings].category === 'research'
  );

  return (
    <Flex direction="column" gap={4}>
      <BuildableContainer headingName="Gathering">
        <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
          <Button
            variant="primary"
            onClick={() =>
              dispatch({ type: 'gatherResource', payload: { name: 'food' } })
            }
          >
            Gather Food
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              dispatch({ type: 'gatherResource', payload: { name: 'lumber' } })
            }
          >
            Gather Lumber
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              dispatch({ type: 'gatherResource', payload: { name: 'stone' } })
            }
          >
            Gather Stone
          </Button>
        </Flex>
      </BuildableContainer>
      {showHousesCategory && (
        <BuildableContainer headingName="Houses">
          <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
            {houseBuildings.map((buildingName) => (
              <BuildableButton
                key={buildingName}
                buildingName={buildingName as keyof Buildings}
              />
            ))}
          </Flex>
        </BuildableContainer>
      )}
      {showProductionCategory && (
        <BuildableContainer headingName="Production">
          <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
            {productionBuildings.map((buildingName) => (
              <BuildableButton
                key={buildingName}
                buildingName={buildingName as keyof Buildings}
              />
            ))}
          </Flex>
        </BuildableContainer>
      )}
      {showResearchCategory && (
        <BuildableContainer headingName="Research">
          <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
            {researchBuildings.map((buildingName) => (
              <BuildableButton
                key={buildingName}
                buildingName={buildingName as keyof Buildings}
              />
            ))}
          </Flex>
        </BuildableContainer>
      )}
    </Flex>
  );
}

export default Buildables;
