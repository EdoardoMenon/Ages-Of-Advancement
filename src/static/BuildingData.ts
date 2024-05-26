import { BuildingData, Buildings } from '../interfaces/Buildings';

export const AllBuildingData = new Map<keyof Buildings, BuildingData>([
    [
        'commonHouse',
        { costs: { lumber: 50, stone: 20 }, benefits: { population: '+1' } },
    ],
    [
        'lumbermill',
        {
            costs: { lumber: 50, stone: 20 },
            benefits: { lumbermill: '+1' },
            resourcesGained: { lumber: 0.5 },
        },
    ],
    [
        'stoneQuarry',
        {
            costs: { lumber: 50, stone: 20 },
            benefits: { stoneQuarry: '+1' },
            resourcesGained: { stone: 0.5 },
        },
    ],
    [
        'farm',
        {
            costs: { lumber: 50, stone: 20 },
            benefits: { farn: '+1' },
            resourcesGained: { food: 0.5 },
        },
    ],
]);
