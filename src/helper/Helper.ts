import { initialSaveData } from '../contexts/InitialSaveData';
import { Building, BuildingCosts } from '../interfaces/Buildings';
import { Resources } from '../interfaces/Resources';
import { SaveData } from '../interfaces/SaveData';

export function capitaliseFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function canAffordBuilding(
  building: Building,
  resources: Resources,
  costs?: Partial<BuildingCosts>
): boolean {
  if (!costs) return false;
  for (const [resource, cost] of Object.entries(costs)) {
    const scaledCost = calculateScalingBuildingCost(
      cost,
      building.rateGrowth,
      building.owned
    );
    const resourceKey = resource as keyof Resources;
    if (!resources[resourceKey] || resources[resourceKey].amount < scaledCost) {
      return false;
    }
  }
  return true;
}

export function canAfford(
  resourceName: keyof Resources,
  cost: number,
  resources: Resources
): boolean {
  const resource = resources[resourceName];
  return resource.amount >= cost;
}

export function calculateScalingBuildingCost(
  cost: number,
  rateGrowth: number,
  owned: number
): number {
  return Math.round(cost * rateGrowth ** owned);
}

export function splitCamelCase(input: string) {
  const result = input.replace(/([a-z])([A-Z0-9])/g, '$1 $2');

  const capitalizedResult = result.charAt(0).toUpperCase() + result.slice(1);

  return capitalizedResult;
}

export function serializeSaveData(data: SaveData): string {
  try {
    const jsonString = JSON.stringify(data);
    return btoa(jsonString);
  } catch (error) {
    console.error('Error serializing save data:', error);
    return '';
  }
}

export function deserializeSaveData(serializedData: string): SaveData {
  try {
    const jsonString = atob(serializedData);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error deserializing save data:', error);
    return initialSaveData;
  }
}

export function formatBigInt(value: bigint): string {
  if (value < 1_000n) return value.toString();
  const suffixes = [
    'K',
    'M',
    'B',
    'T',
    'Qa',
    'Qi',
    'Sx',
    'Sp',
    'Oc',
    'No',
    'Dc',
  ];
  let suffixIndex = -1;
  let formattedValue = value;

  while (formattedValue >= 1_000n && suffixIndex < suffixes.length - 1) {
    formattedValue /= 1_000n;
    suffixIndex += 1;
  }

  return `${formattedValue} ${suffixes[suffixIndex]}`;
}
