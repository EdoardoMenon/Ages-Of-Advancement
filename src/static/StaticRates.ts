import { BuildingRate, StaticRates } from '../interfaces/StaticRates';

export const AllStaticRates: StaticRates = {
    humanFoodDeduction: -0.5,
    buildings: {
        lumbermill: [{ resource: 'lumber', rate: 0.5 }],
        stoneQuarry: [{ resource: 'stone', rate: 0.5 }],
    } as BuildingRate,
};
