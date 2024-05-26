import { Research, ResearchData } from '../interfaces/Research';

export const AllResearchData = new Map<keyof Research, ResearchData>([
    [
        'copperMine',
        {
            researchPrerequisites: [],
            buildingPrerequisites: [],
            viewingPrerequisites: ['lumbermill', 'stoneQuarry', 'farm'],
            cost: 100,
        },
    ],
    [
        'tinMine',
        {
            researchPrerequisites: [],
            buildingPrerequisites: [],
            viewingPrerequisites: ['copperMine'],
            cost: 100,
        },
    ],
    [
        'smelting',
        {
            researchPrerequisites: [],
            buildingPrerequisites: [],
            viewingPrerequisites: ['tinMine'],
            cost: 100,
        },
    ],
    [
        'clickingPower',
        {
            researchPrerequisites: [],
            buildingPrerequisites: [],
            viewingPrerequisites: ['lumbermill', 'stoneQuarry', 'farm'],
            cost: 100,
        },
    ],
    [
        'clickingPower2',
        {
            researchPrerequisites: [],
            buildingPrerequisites: [],
            viewingPrerequisites: ['clickingPower'],
            cost: 500,
        },
    ],
]);
