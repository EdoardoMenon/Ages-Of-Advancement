import { BuildingData, Buildings } from '../interfaces/Buildings';
import { AllStaticRates } from './StaticRates';

export const AllBuildingData = new Map<keyof Buildings, BuildingData>([
  [
    'commonHouse',
    {
      costs: { lumber: 50, stone: 20 },
      description: 'A common house for residents to live in',
      effects: {
        population: '+1',
        food: `${AllStaticRates.humanFoodDeduction}/s`,
      },
      saveDataUpdates: (saveData) => {
        return {
          population: {
            ...saveData.population,
            maxWorkers: saveData.population.maxWorkers + 1,
            availableWorkers: saveData.population.maxWorkers + 1,
          },
        };
      },
    },
  ],
  [
    'lumbermill',
    {
      costs: { lumber: 50, stone: 20 },
      description: 'A place for workers to cut down trees and collect lumber',
      effects: { lumbermill: '+1' },
      resourcesGained: { lumber: 0.5 },
    },
  ],
  [
    'stoneQuarry',
    {
      costs: { lumber: 50, stone: 20 },
      description: 'A place for workers to mine and collect stone',
      effects: { stoneQuarry: '+1' },
      resourcesGained: { stone: 0.5 },
    },
  ],
  [
    'farm',
    {
      costs: { lumber: 50, stone: 20 },
      description: 'A place for workers to farm and grow food',
      effects: { farm: '+1' },
      resourcesGained: { food: 1 },
    },
  ],
  [
    'school',
    {
      costs: { lumber: 50, stone: 20 },
      description: 'A place for minds to come together and research to be done',
      effects: { school: '+1' },
      resourcesGained: { research: 0.25 },
    },
  ],
  [
    'copperMine',
    {
      costs: { lumber: 50, stone: 20 },
      description: 'A mine to gather copper',
      effects: { copperMine: '+1' },
      resourcesGained: { copper: 0.5 },
    },
  ],
  [
    'tinMine',
    {
      costs: { lumber: 50, stone: 20 },
      description: 'A mine to gather tin',
      effects: { tinMine: '+1' },
      resourcesGained: { tin: 0.5 },
    },
  ],
]);
