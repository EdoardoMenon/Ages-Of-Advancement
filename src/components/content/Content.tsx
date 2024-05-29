import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Buildables from './buildable/Buildables';
import Population from './population/Population';
import Research from './research/Research';
import { useContextSelector } from 'use-context-selector';
import { SaveDataContext } from '../providers/save-data-provider/SaveDataProvider';

function Content() {
  const { population, buildings } = useContextSelector(SaveDataContext, (s) => {
    return { population: s.state.population, buildings: s.state.buildings };
  });

  const showResearch = Object.values(buildings).some(
    (building) => building.category === 'research' && !building.isHidden
  );

  const showPopulation = Object.values(buildings).some(
    (building) =>
      building.category === 'production' &&
      !building.isHidden &&
      building.owned > 0
  );

  return (
    <Tabs w="100%" align="center">
      <TabList borderColor="light-background.400" my={1} gap={3}>
        <Tab>Build</Tab>
        {showResearch && <Tab>Research</Tab>}
        {showPopulation && (
          <Tab>
            Population{' '}
            {population.availableWorkers > 0 &&
              `(${population.availableWorkers})`}
          </Tab>
        )}
      </TabList>

      <TabPanels>
        <TabPanel>
          <Buildables />
        </TabPanel>
        {showResearch && (
          <TabPanel p={0}>
            <Research />
          </TabPanel>
        )}
        {showPopulation && (
          <TabPanel>
            <Population />
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  );
}

export default Content;
