import { Research } from '../../../interfaces/Research';
import { SaveData } from '../../../interfaces/SaveData';
import { AllResearchData } from '../../../static/ResearchData';

export interface PurchaseResearchAction {
  type: 'purchaseResearch';
  payload: Parameters<typeof purchaseResearch>[1];
}

export function purchaseResearch(
  saveData: SaveData,
  researchName: keyof Research
): SaveData {
  const researchData = AllResearchData.get(researchName);

  if (!researchData) return saveData;

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

  const canAfford = saveData.resources.research.amount >= researchData.cost;

  if (!researchPrereqsMet || !buildingPrereqsMet || !canAfford) return saveData;

  let updates = {
    ...saveData,
    resources: {
      ...saveData.resources,
      research: {
        ...saveData.resources.research,
        amount: saveData.resources.research.amount - (researchData?.cost ?? 0),
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
  return updates;
}
