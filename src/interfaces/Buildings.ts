import { Resources } from './Resources';
import { SaveData } from './SaveData';

export type Category = 'gathering' | 'houses' | 'production' | 'research';

export type BuildingCosts = {
  [key in keyof Resources]: number;
};

export interface BuildingEffects {
  [key: string]: number | string;
}

export interface BuildingData {
  costs: Partial<BuildingCosts>;
  effects: BuildingEffects;
  description: string;
  saveDataUpdates?(saveData: SaveData): Partial<SaveData>;
  resourcesGained?: {
    [key in keyof Resources]?: number;
  };
}

export interface Building {
  owned: number;
  rateGrowth: number;
  isHidden: boolean;
  category: Category;
}

export interface PassiveBuilding extends Building {}

export interface ActiveBuilding extends Building {
  assigned: number;
}

export interface Buildings {
  commonHouse: ActiveBuilding;
  lumbermill: ActiveBuilding;
  stoneQuarry: ActiveBuilding;
  farm: ActiveBuilding;
  copperMine: ActiveBuilding;
  tinMine: ActiveBuilding;
  school: PassiveBuilding;
}
