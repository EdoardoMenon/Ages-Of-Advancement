import { SaveData } from '../interfaces/SaveData';

export const initialSaveData: SaveData = {
  resources: {
    research: {
      amount: 0,
      capacity: 500,
      rate: 0,
      isHidden: true,
    },
    lumber: {
      amount: 0,
      capacity: 500,
      rate: 0,
      isHidden: false,
      requiresResource: ['food'],
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
      requiresResource: ['food'],
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
  buildings: {
    commonHouse: {
      owned: 0,
      rateGrowth: 1.07,
      assigned: 0,
      isHidden: true,
      category: 'houses',
    },
    lumbermill: {
      owned: 0,
      rateGrowth: 1.07,
      assigned: 0,
      isHidden: true,
      category: 'production',
    },
    stoneQuarry: {
      owned: 0,
      rateGrowth: 1.07,
      assigned: 0,
      isHidden: true,
      category: 'production',
    },
    farm: {
      owned: 0,
      rateGrowth: 1.07,
      assigned: 0,
      isHidden: true,
      category: 'production',
    },
    copperMine: {
      owned: 0,
      rateGrowth: 1.07,
      assigned: 0,
      isHidden: true,
      category: 'production',
    },
    tinMine: {
      owned: 0,
      rateGrowth: 1.07,
      assigned: 0,
      isHidden: true,
      category: 'production',
    },
    school: {
      owned: 0,
      rateGrowth: 1.07,
      isHidden: true,
      category: 'research',
    },
  },
  population: {
    maxWorkers: 0,
    availableWorkers: 0,
  },
  research: {
    smelting: { isComplete: false },
    copperMine: { isComplete: false },
    tinMine: { isComplete: false },
    clickingPower: { isComplete: false },
    clickingPower2: { isComplete: false },
  },
  stats: {},
  events: [
    {
      timestamp: Date.now(),
      text: 'Welcome to Ages of Advancement!',
      color: 'assorted.green',
    },
  ],
  clickingPower: 1,
};
