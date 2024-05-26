import { Buildings } from './Buildings';

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
    researchPrerequisites: (keyof Research)[];
    buildingPrerequisites: (keyof Buildings)[];
    cost: number;
}
