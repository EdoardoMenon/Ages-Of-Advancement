import { BuildingData, Buildings } from '../interfaces/Buildings';

export const AllBuildingData = new Map<keyof Buildings, BuildingData>([
    [
        'commonHouses',
        { costs: { lumber: 50, stone: 20 }, benefits: { population: '+1' } },
    ],
]);
