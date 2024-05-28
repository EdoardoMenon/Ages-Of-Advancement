import { Buildings } from './Buildings';
import { Resources } from './Resources';
import { SaveData } from './SaveData';

export interface ResearchInfo {
  isComplete: boolean;
}

export interface Research {
  smelting: ResearchInfo;
  copperMine: ResearchInfo;
  tinMine: ResearchInfo;
  clickingPower: ResearchInfo;
  clickingPower2: ResearchInfo;
}

export interface ResearchData {
  researchPrerequisites?: (keyof Research)[];
  buildingPrerequisites?: (keyof Buildings)[];
  viewingPrerequisites: (keyof Research | keyof Buildings | keyof Resources)[];
  cost: number;
  buildingUnlocks?: (keyof Buildings)[];
  alternativeEffect?(saveData: SaveData): Partial<SaveData>;
  description: string;
}
