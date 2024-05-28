import { Button, Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import BuildableContainer from './BuildableContainer';
import { SaveDataContext } from '../../../contexts/SaveDataContext';
import BuildableButton from './BuildableButton';
import { Buildings } from '../../../interfaces/Buildings';

function Buildables() {
  const { saveData, gatherResource, purchaseBuildingIfPossible } =
    useContext(SaveDataContext);

  const showHousesCategory = Object.values(saveData.buildings).some(
    (building) => building.category === 'houses' && !building.isHidden
  );

  const showResearchCategory = Object.values(saveData.buildings).some(
    (building) => building.category === 'research' && !building.isHidden
  );

  const showProductionCategory = Object.values(saveData.buildings).some(
    (building) => building.category === 'production' && !building.isHidden
  );

  const houseBuildings = Object.keys(saveData.buildings).filter(
    (buildingName) =>
      saveData.buildings[buildingName as keyof Buildings].category === 'houses'
  );

  const productionBuildings = Object.keys(saveData.buildings).filter(
    (buildingName) =>
      saveData.buildings[buildingName as keyof Buildings].category ===
      'production'
  );

  const researchBuildings = Object.keys(saveData.buildings).filter(
    (buildingName) =>
      saveData.buildings[buildingName as keyof Buildings].category ===
      'research'
  );

  return (
    <Flex direction="column" gap={4}>
      <BuildableContainer headingName="Gathering">
        <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
          <Button variant="primary" onClick={() => gatherResource('food')}>
            Gather Food
          </Button>
          <Button variant="primary" onClick={() => gatherResource('lumber')}>
            Gather Lumber
          </Button>
          <Button variant="primary" onClick={() => gatherResource('stone')}>
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
