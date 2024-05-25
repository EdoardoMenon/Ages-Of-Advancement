import { Buildings } from './Buildings';
import { Resources } from './Resources';

export interface AssignableBuildingInfo {
    resource: keyof Resources;
    rate: number;
}

export type BuildingRate = {
    [key in keyof Buildings]: AssignableBuildingInfo[];
};

export interface StaticRates {
    humanFoodDeduction: number;
    buildings: BuildingRate;
}
