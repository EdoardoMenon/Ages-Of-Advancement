import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Buildables from './buildable/Buildables';
import Population from './population/Population';
import Research from './research/Research';
import { useContext } from 'react';
import { SaveDataContext } from '../../contexts/SaveDataContext';

function Content() {
    const { saveData } = useContext(SaveDataContext);

    const showResearch = Object.values(saveData.buildings).some(
        (building) => building.category === 'research' && !building.isHidden
    );

    const showPopulation = Object.values(saveData.buildings).some(
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
                        {saveData.population.availableWorkers > 0 &&
                            `(${saveData.population.availableWorkers})`}
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
