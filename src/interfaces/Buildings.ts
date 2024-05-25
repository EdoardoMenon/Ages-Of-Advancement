import { Resources } from './Resources';

export type BuildingCosts = {
    [key in keyof Resources]: number;
};

export interface BuildingBenefits {
    [key: string]: number | string;
}

export interface BuildingData {
    costs: Partial<BuildingCosts>;
    benefits: BuildingBenefits;
}

export interface Building {
    owned: number;
    rateGrowth: number;
}

export interface Buildings {
    commonHouses: Building;
    lumbermill: Building;
    stoneQuarry: Building;
}
