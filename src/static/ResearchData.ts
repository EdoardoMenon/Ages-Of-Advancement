import { Research, ResearchData } from '../interfaces/Research';

export const AllResearchData = new Map<keyof Research, ResearchData>([
  [
    'copperMine',
    {
      viewingPrerequisites: ['lumbermill', 'stoneQuarry', 'farm'],
      cost: 100,
      buildingUnlocks: ['copperMine'],
      description: 'Unlock the ability to create mines to gather copper',
    },
  ],
  [
    'tinMine',
    {
      viewingPrerequisites: ['copperMine'],
      cost: 100,
      buildingUnlocks: ['tinMine'],
      description: 'Unlock the ability to create mines to gather tin',
    },
  ],
  [
    'smelting',
    {
      buildingPrerequisites: ['copperMine', 'tinMine'],
      researchPrerequisites: ['tinMine'],
      viewingPrerequisites: ['copperMine'],
      cost: 100,
      //TODO: Add building unlock for smelter which takes copper and tin and creates bronze
      description: 'Unlock the ability to combine copper and tin to bronze',
    },
  ],
  [
    'clickingPower',
    {
      viewingPrerequisites: ['lumbermill', 'stoneQuarry', 'farm'],
      cost: 100,
      alternativeEffect: (saveData) => {
        return {
          clickingPower: saveData.clickingPower + 1,
        };
      },
      description: 'Increase the amount gathered when gathering resources by 1',
    },
  ],
  [
    'clickingPower2',
    {
      viewingPrerequisites: ['clickingPower'],
      cost: 500,
      alternativeEffect: (saveData) => {
        return {
          clickingPower: saveData.clickingPower + 1,
        };
      },
      description: 'Increase the amount gathered when gathering resources by 1',
    },
  ],
]);
