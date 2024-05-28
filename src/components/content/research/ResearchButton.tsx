import { Button } from '@chakra-ui/react';
import { Research } from '../../../interfaces/Research';
import HoverPopupExpandable from '../../hover-popup/HoverPopupExpandable';
import ResearchPopup from './ResearchPopup';
import { splitCamelCase } from '../../../helper/Helper';
import { useContext } from 'react';
import { SaveDataContext } from '../../../contexts/SaveDataContext';
import { AllResearchData } from '../../../static/ResearchData';

interface Props {
  researchName: keyof Research;
}

function ResearchButton({ researchName }: Props) {
  const { saveData, setSaveData } = useContext(SaveDataContext);

  return (
    <HoverPopupExpandable
      content={
        <ResearchPopup
          description={AllResearchData.get(researchName)?.description ?? ''}
          researchName={researchName}
        />
      }
    >
      <Button
        variant="primary"
        onClick={(e) => {
          e.stopPropagation();
          const researchData = AllResearchData.get(researchName);

          if (!researchData) return;

          const researchPrereqsMet = researchData.researchPrerequisites
            ? researchData.researchPrerequisites.every(
                (req) => saveData.research[req]?.isComplete
              )
            : true;

          const buildingPrereqsMet = researchData.buildingPrerequisites
            ? researchData.buildingPrerequisites.every(
                (req) => !saveData.buildings[req]?.isHidden
              )
            : true;

          const canAfford =
            saveData.resources.research.amount >= researchData.cost;

          if (!researchPrereqsMet || !buildingPrereqsMet || !canAfford) return;

          let updates = {
            ...saveData,
            resources: {
              ...saveData.resources,
              research: {
                ...saveData.resources.research,
                amount:
                  saveData.resources.research.amount -
                  (researchData?.cost ?? 0),
              },
            },
            research: {
              ...saveData.research,
              [researchName]: {
                ...saveData.research[researchName],
                isComplete: true,
              },
            },
          };
          if (researchData?.buildingUnlocks) {
            for (const building of researchData.buildingUnlocks) {
              updates = {
                ...updates,
                buildings: {
                  ...updates.buildings,
                  [building]: {
                    ...updates.buildings[building],
                    isHidden: false,
                  },
                },
              };
            }
          }
          if (researchData?.alternativeEffect) {
            updates = {
              ...updates,
              ...researchData.alternativeEffect(saveData),
            };
          }
          setSaveData(updates);
        }}
      >
        {splitCamelCase(researchName)}
      </Button>
    </HoverPopupExpandable>
  );
}

export default ResearchButton;
