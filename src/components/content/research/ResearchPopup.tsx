import { Flex, Text } from '@chakra-ui/react';
import { Research } from '../../../interfaces/Research';
import { canAfford } from '../../../helper/Helper';
import { AllResearchData } from '../../../static/ResearchData';
import { useContextSelector } from 'use-context-selector';
import { SaveDataContext } from '../../providers/save-data-provider/SaveDataProvider';

interface Props {
  description: string;
  researchName: keyof Research;
}

function ResearchPopup({ description, researchName }: Props) {
  const resources = useContextSelector(
    SaveDataContext,
    (s) => s.state.resources
  );
  const researchData = AllResearchData.get(researchName);
  //TODO: Map over all prerequisites and show which ones are required to purchase the research

  return (
    <Flex direction="column" maxW="200px" gap={4} alignItems="flex-start" p={2}>
      <Text textAlign="left">{description}</Text>
      <Flex direction="column" alignContent="flex-start" w="100%">
        <Text mb={2}>Costs:</Text>
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
    </Flex>
  );
}

export default ResearchPopup;
