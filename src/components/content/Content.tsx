import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Buildables from './buildable/Buildables';
import Population from './population/Population';
import Research from './research/Research';

function Content() {
    return (
        <Tabs w="100%" align="center">
            <TabList borderColor="light-background.400" my={1} gap={3}>
                <Tab>Build</Tab>
                <Tab>Research</Tab>
                <Tab>Population</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Buildables />
                </TabPanel>
                <TabPanel>
                    <Research />
                </TabPanel>
                <TabPanel>
                    <Population />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}

export default Content;
