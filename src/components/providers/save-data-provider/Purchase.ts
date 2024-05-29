import { canAffordBuilding } from '../../../helper/Helper';
import { Buildings } from '../../../interfaces/Buildings';
import { Resources } from '../../../interfaces/Resources';
import { SaveData } from '../../../interfaces/SaveData';
import { checkBuildingConditions } from '../../../static/BuildingConditions';
import { AllBuildingData } from '../../../static/BuildingData';
import { checkResourceConditions } from '../../../static/ResourceConditions';
import { AllStaticRates } from '../../../static/StaticRates';

export interface PurchaseBuildingAction {
  type: 'purchaseBuildingIfPossible';
  payload: {
    buildingName: Parameters<typeof purchaseBuildingIfPossible>[1];
    updates: Parameters<typeof purchaseBuildingIfPossible>[2];
    increaseRates?: Parameters<typeof purchaseBuildingIfPossible>[3];
  };
}

export function purchaseBuildingIfPossible(
  saveData: SaveData,
  buildingName: keyof Buildings,
  updates: Partial<SaveData>,
  increaseRates?: boolean
): SaveData {
  const buildingCost = AllBuildingData.get(buildingName)?.costs;
  const canAfford = canAffordBuilding(
    saveData.buildings[buildingName],
    saveData.resources,
    buildingCost
  );

  if (!buildingCost || !canAfford) return saveData;

  const updatedResources = { ...saveData.resources };

  for (const [resourceName, cost] of Object.entries(buildingCost)) {
    const resourceKey = resourceName as keyof Resources;
    updatedResources[resourceKey] = {
      ...updatedResources[resourceKey],
      amount: updatedResources[resourceKey].amount - cost,
    };
  }

  if (buildingName === 'commonHouse') {
    updatedResources.food.rate += AllStaticRates.humanFoodDeduction;
  }

  if (increaseRates) {
    Object.entries(
      AllBuildingData.get(buildingName)?.resourcesGained ?? {}
    ).forEach(([name, amount]) => {
      if (amount !== undefined) {
        const resource = updatedResources[name as keyof Resources];
        const newRate = resource.rate + amount;
        updatedResources[name as keyof Resources] = {
          ...resource,
          rate: newRate,
        };
      }
    });
  }

  const newSaveData = {
    ...saveData,
    resources: updatedResources,
    ...updates,
  };

  return newSaveData;
}

export function checkVisibilityConditions(saveData: SaveData): SaveData {
  const updatedBuildings = checkBuildingConditions(
    saveData.buildings,
    saveData.resources
  );
  const updatedResources = checkResourceConditions(
    saveData.resources,
    saveData.buildings
  );
  return {
    ...saveData,
    buildings: updatedBuildings,
    resources: updatedResources,
  };
}
