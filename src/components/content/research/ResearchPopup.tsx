import { Flex, Text } from '@chakra-ui/react';
import { Research } from '../../../interfaces/Research';
import { canAfford, splitCamelCase } from '../../../helper/Helper';
import { AllResearchData } from '../../../static/ResearchData';
import { useContextSelector } from 'use-context-selector';
import { SaveDataContext } from '../../providers/save-data-provider/SaveDataProvider';

interface Props {
  description: string;
  researchName: keyof Research;
}

function ResearchPopup({ description, researchName }: Props) {
  const { resources, research, buildings } = useContextSelector(
    SaveDataContext,
    (s) => {
      return {
        resources: s.state.resources,
        research: s.state.research,
        buildings: s.state.buildings,
      };
    }
  );
  const researchData = AllResearchData.get(researchName);

  return (
    <Flex direction="column" maxW="200px" gap={4} alignItems="flex-start" p={2}>
      <Text textAlign="left">{description}</Text>
      <Flex direction="column" alignContent="flex-start" w="100%">
        <Text mb={2} textAlign="center">
          Costs:
        </Text>
        <Text
          textAlign="left"
          color={
            canAfford('research', researchData?.cost ?? 0, resources)
              ? 'assorted.green'
              : 'assorted.red'
          }
        >
          Research: {researchData?.cost}
        </Text>
      </Flex>
      {researchData?.buildingPrerequisites && (
        <Flex direction="column" alignContent="flex-start" w="100%">
          <Text mb={2} textAlign="center">
            Buildings:
          </Text>
          <Text mb={2} color="grey">
            You must have unlocked each of these buildings in order to purchase
            this research
          </Text>
          {researchData.buildingPrerequisites.map((building) => {
            const hasMetPreReq = buildings[building].isHidden == false;
            return (
              <Text
                textAlign="left"
                color={hasMetPreReq ? 'assorted.green' : 'assorted.red'}
              >
                {splitCamelCase(building)}
              </Text>
            );
          })}
        </Flex>
      )}
      {researchData?.researchPrerequisites && (
        <Flex direction="column" alignContent="flex-start" w="100%">
          <Text mb={2} textAlign="center">
            Research:
          </Text>
          <Text mb={2} color="grey">
            You must have unlocked these before you can purchase
          </Text>
          {researchData.researchPrerequisites.map((researchName) => {
            const hasMetPreReq = research[researchName].isComplete == true;
            return (
              <Text
                textAlign="left"
                color={hasMetPreReq ? 'assorted.green' : 'assorted.red'}
              >
                {splitCamelCase(researchName)}
              </Text>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
}

export default ResearchPopup;
