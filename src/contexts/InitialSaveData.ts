import { SaveData } from '../interfaces/SaveData';

export const initialSaveData: SaveData = {
    resources: {
        research: {
            amount: 0,
            capacity: 500,
            rate: 0,
            isHidden: false,
        },
        lumber: {
            amount: 0,
            capacity: 500,
            rate: 0,
            isHidden: false,
        },
        food: {
            amount: 0,
            capacity: 500,
            rate: 0,
            isHidden: false,
        },
        stone: {
            amount: 0,
            capacity: 500,
            rate: 0,
            isHidden: false,
        },
        gold: {
            amount: 0,
            capacity: 500,
            rate: 0,
            isHidden: true,
        },
        iron: {
            amount: 0,
            capacity: 500,
            rate: 0,
            isHidden: true,
        },
        copper: {
            amount: 0,
            capacity: 500,
            rate: 0,
            isHidden: true,
        },
        tin: {
            amount: 0,
            capacity: 500,
            rate: 0,
            isHidden: true,
        },
    },
    stats: {},
};
