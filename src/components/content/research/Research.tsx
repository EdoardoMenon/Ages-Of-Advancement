import {
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import ResearchContainer from './ResearchContainer';
import { Buildings } from '../../../interfaces/Buildings';
import { Resources } from '../../../interfaces/Resources';
import { useContext } from 'react';
import { SaveDataContext } from '../../../contexts/SaveDataContext';
import { Research as IResearch } from '../../../interfaces/Research';
import { AllResearchData } from '../../../static/ResearchData';
import { splitCamelCase } from '../../../helper/Helper';
import ResearchButton from './ResearchButton';

function Research() {
  const { saveData } = useContext(SaveDataContext);

  function isPrerequisiteMet(
    prerequisite: keyof IResearch | keyof Buildings | keyof Resources
  ): boolean {
    if (prerequisite in saveData.research) {
      return saveData.research[prerequisite as keyof IResearch].isComplete;
    } else if (prerequisite in saveData.buildings) {
      return saveData.buildings[prerequisite as keyof Buildings].owned > 0;
    } else if (prerequisite in saveData.resources) {
      return !saveData.resources[prerequisite as keyof Resources].isHidden;
    }
    return false;
  }

  function isViewingPrerequisiteMet(
    prerequisites: (keyof IResearch | keyof Buildings | keyof Resources)[]
  ): boolean {
    return prerequisites.every((prerequisite) =>
      isPrerequisiteMet(prerequisite)
    );
  }

  const completedResearch = Object.entries(saveData.research).filter(
    ([, value]) => value.isComplete
  );

  const incompleteResearch = Object.entries(saveData.research).filter(
    ([, value]) => !value.isComplete
  );

  return (
    <Tabs w="100%" align="center">
      <TabList borderColor="light-background.400" my={1} gap={3}>
        <Tab>Research</Tab>
        <Tab>Completed</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ResearchContainer>
            {incompleteResearch.map(([key]) => {
              const researchData = AllResearchData.get(key as keyof IResearch);
              if (!researchData) return null;

              if (
                !isViewingPrerequisiteMet(researchData.viewingPrerequisites)
              ) {
                return null;
              }

              return (
                <ResearchButton
                  key={key}
                  researchName={key as keyof IResearch}
                />
              );
            })}
          </ResearchContainer>
        </TabPanel>
        <TabPanel>
          <ResearchContainer>
            {completedResearch.length > 0 ? (
              completedResearch.map(([key]) => (
                <Button key={key} variant="primary">
                  {splitCamelCase(key)}
                </Button>
              ))
            ) : (
              <Flex w="100%" justifyContent="center" alignItems="center">
                No research complete
              </Flex>
            )}
          </ResearchContainer>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Research;
