import { Research, ResearchData } from '../interfaces/Research';

export const AllResearchData = new Map<keyof Research, ResearchData>([
    [
        'copperMine',
        {
            viewingPrerequisites: ['lumbermill', 'stoneQuarry', 'farm'],
            cost: 100,
            description: 'Unlock the ability to create mines to gather copper',
        },
    ],
    [
        'tinMine',
        {
            viewingPrerequisites: ['copperMine'],
            cost: 100,
            description: 'Unlock the ability to create mines to gather tin',
        },
    ],
    [
        'smelting',
        {
            buildingPrerequisites: ['copperMine', 'tinMine'],
            researchPrerequisites: ['tinMine'],
            viewingPrerequisites: ['copperMine'],
            cost: 100,
            description:
                'Unlock the ability to combine copper and tin to bronze',
        },
    ],
    [
        'clickingPower',
        {
            viewingPrerequisites: ['lumbermill', 'stoneQuarry', 'farm'],
            cost: 100,
            description:
                'Increase the amount gathered when gathering resources by 1',
        },
    ],
    [
        'clickingPower2',
        {
            viewingPrerequisites: ['clickingPower'],
            cost: 500,
            description:
                'Increase the amount gathered when gathering resources by 1',
        },
    ],
]);
