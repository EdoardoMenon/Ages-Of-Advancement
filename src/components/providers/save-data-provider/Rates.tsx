import { ActiveBuilding, Buildings } from '../../../interfaces/Buildings';
import { Resources } from '../../../interfaces/Resources';
import { SaveData } from '../../../interfaces/SaveData';
import { AllBuildingData } from '../../../static/BuildingData';

export interface IncreaseRatesAction {
  type: 'increaseRates';
  payload: Parameters<typeof increaseRates>[1];
}

export interface DecreaseRatesAction {
  type: 'decreaseRates';
  payload: Parameters<typeof decreaseRates>[1];
}

export interface GatherResourceAction {
  type: 'gatherResource';
  payload: {
    name: keyof Resources;
    amount?: number;
  };
}

export function incrementResources(saveData: SaveData): SaveData {
  const newResources = { ...saveData.resources };

  Object.keys(newResources).forEach((key) => {
    const resource = newResources[key as keyof Resources];

    if (resource.rate !== 0) {
      const requiredResources = resource.requiresResource || [];
      const canIncrease = requiredResources.every(
        (reqResource) => newResources[reqResource].amount > 0
      );

      if (canIncrease) {
        const newAmount =
          resource.rate > 0
            ? Math.min(resource.amount + resource.rate, resource.capacity)
            : Math.max(resource.amount + resource.rate, 0);

        newResources[key as keyof Resources] = {
          ...resource,
          amount: newAmount,
        };
      }
    }
  });

  return {
    ...saveData,
    resources: newResources,
  };
}

export function increaseRates(
  saveData: SaveData,
  buildingName?: keyof Buildings
): SaveData {
  if (!buildingName) return { ...saveData };

  const newResources = { ...saveData.resources };
  let newPopulation = { ...saveData.population };

  const newBuildings = { ...saveData.buildings };
  const building = newBuildings[buildingName] as ActiveBuilding;

  if (building.assigned !== undefined) {
    if (
      saveData.population.availableWorkers < 1 ||
      building.assigned >= building.owned
    ) {
      return saveData;
    }

    newPopulation = {
      ...saveData.population,
      availableWorkers: saveData.population.availableWorkers - 1,
    };
    newBuildings[buildingName] = {
      ...newBuildings[buildingName],
      assigned: building.assigned + 1,
    };
  }

  Object.entries(
    AllBuildingData.get(buildingName)?.resourcesGained ?? {}
  ).forEach(([name, amount]) => {
    if (amount !== undefined) {
      const resource = newResources[name as keyof Resources];
      const newRate = resource.rate + amount;
      newResources[name as keyof Resources] = {
        ...resource,
        rate: newRate,
      };
    }
  });

  return {
    ...saveData,
    resources: newResources,
    population: newPopulation,
    buildings: newBuildings,
  };
}

export function decreaseRates(
  saveData: SaveData,
  buildingName?: keyof Buildings
): SaveData {
  if (!buildingName) return saveData;
  const newResources = { ...saveData.resources };
  let newPopulation = { ...saveData.population };

  const newBuildings = { ...saveData.buildings };
  if (buildingName) {
    const building = newBuildings[buildingName] as ActiveBuilding;
    if (building.assigned !== undefined) {
      if (building.assigned < 1) {
        return saveData;
      }
      newPopulation = {
        ...saveData.population,
        availableWorkers: saveData.population.availableWorkers + 1,
      };
      newBuildings[buildingName] = {
        ...newBuildings[buildingName],
        assigned: building.assigned - 1,
      };
    }
  }

  Object.entries(
    AllBuildingData.get(buildingName)?.resourcesGained ?? {}
  ).forEach(([name, amount]) => {
    if (amount !== undefined) {
      const resource = newResources[name as keyof Resources];
      const newRate = resource.rate - amount;
      newResources[name as keyof Resources] = {
        ...resource,
        rate: newRate,
      };
    }
  });

  return {
    ...saveData,
    resources: newResources,
    population: newPopulation,
    buildings: newBuildings,
  };
}

export function gatherResource(
  saveData: SaveData,
  name: keyof Resources,
  amount: number = 1
): SaveData {
  const resource = saveData.resources[name];
  const newAmount = Math.min(
    resource.amount + amount * saveData.clickingPower,
    resource.capacity
  );

  return {
    ...saveData,
    resources: {
      ...saveData.resources,
      [name]: {
        ...resource,
        amount: newAmount,
      },
    },
  };
}
