import { Research, ResearchData } from '../interfaces/Research';

export const AllResearchData = new Map<keyof Research, ResearchData>([
    [
        'copperMine',
        {
            researchPrerequisites: [],
            buildingPrerequisites: ['lumbermill', 'stoneQuarry'],
            cost: 100,
        },
    ],
    [
        'tinMine',
        {
            researchPrerequisites: [],
            buildingPrerequisites: ['copperMine'],
            cost: 100,
        },
    ],
    [
        'smelting',
        {
            researchPrerequisites: [],
            buildingPrerequisites: ['tinMine'],
            cost: 100,
        },
    ],
    [
        'clickingPower',
        {
            researchPrerequisites: [],
            buildingPrerequisites: [],
            cost: 100,
        },
    ],
    [
        'clickingPower2',
        {
            researchPrerequisites: ['clickingPower'],
            buildingPrerequisites: [],
            cost: 500,
        },
    ],
]);
