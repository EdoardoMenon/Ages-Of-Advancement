import { BuildingData, Buildings } from '../interfaces/Buildings';
import { AllStaticRates } from './StaticRates';

export const AllBuildingData = new Map<keyof Buildings, BuildingData>([
    [
        'commonHouse',
        {
            costs: { lumber: 50, stone: 20 },
            effects: {
                population: '+1',
                food: `${AllStaticRates.humanFoodDeduction}/s`,
            },
        },
    ],
    [
        'lumbermill',
        {
            costs: { lumber: 50, stone: 20 },
            effects: { lumbermill: '+1' },
            resourcesGained: { lumber: 0.5 },
        },
    ],
    [
        'stoneQuarry',
        {
            costs: { lumber: 50, stone: 20 },
            effects: { stoneQuarry: '+1' },
            resourcesGained: { stone: 0.5 },
        },
    ],
    [
        'farm',
        {
            costs: { lumber: 50, stone: 20 },
            effects: { farm: '+1' },
            resourcesGained: { food: 1 },
        },
    ],
    [
        'school',
        {
            costs: { lumber: 50, stone: 20 },
            effects: { school: '+1' },
            resourcesGained: { research: 0.25 },
        },
    ],
    [
        'copperMine',
        {
            costs: { lumber: 50, stone: 20 },
            effects: { copperMine: '+1' },
            resourcesGained: { copper: 0.5 },
        },
    ],
    [
        'tinMine',
        {
            costs: { lumber: 50, stone: 20 },
            effects: { tinMine: '+1' },
            resourcesGained: { tin: 0.5 },
        },
    ],
]);
