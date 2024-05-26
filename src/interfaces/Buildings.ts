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
    resourcesGained?: {
        [key in keyof Resources]?: number;
    };
}

export interface Building {
    owned: number;
    rateGrowth: number;
    assigned: number;
}

export interface Buildings {
    commonHouse: Building;
    lumbermill: Building;
    stoneQuarry: Building;
    farm: Building;
}
