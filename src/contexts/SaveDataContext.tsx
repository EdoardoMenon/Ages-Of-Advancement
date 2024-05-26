import { ReactNode, createContext, useState, useEffect, useRef } from 'react';
import { SaveData } from '../interfaces/SaveData';
import { initialSaveData } from './InitialSaveData';
import { Resources } from '../interfaces/Resources';
import { ActiveBuilding, Buildings } from '../interfaces/Buildings';
import {
    canAffordBuilding,
    deserializeSaveData,
    serializeSaveData,
} from '../helper/Helper';
import { AllBuildingData } from '../static/BuildingData';
import { AllStaticRates } from '../static/StaticRates';
import { checkBuildingConditions } from '../static/BuildingConditions';
import { checkResourceConditions } from '../static/ResourceConditions';

interface StateType {
    saveData: SaveData;
    setSaveData: React.Dispatch<React.SetStateAction<SaveData>>;
    gatherResource(name: keyof Resources, amount?: number): void;
    increaseRates(buildingName?: keyof Buildings): void;
    decreaseRates(buildingName?: keyof Buildings): void;
    purchaseBuildingIfPossible(
        buildingName: keyof Buildings,
        updates: Partial<SaveData>,
        increaseRates?: boolean
    ): void;
    manualSave(): void;
    clearSave(): void;
}

export const SaveDataContext = createContext<StateType>({} as StateType);

export function SaveDataProvider({ children }: { children: ReactNode }) {
    const [saveData, setSaveData] = useState<SaveData>(() => {
        const savedData = localStorage.getItem('aoa_savedata');
        return savedData ? deserializeSaveData(savedData) : initialSaveData;
    });

    const saveDataRef = useRef(saveData);

    useEffect(() => {
        saveDataRef.current = saveData;
    }, [saveData]);

    useEffect(() => {
        const saveInterval = setInterval(() => {
            localStorage.setItem(
                'aoa_savedata',
                serializeSaveData(saveDataRef.current)
            );
        }, 60000);

        return () => clearInterval(saveInterval);
    }, []);

    function manualSave() {
        localStorage.setItem(
            'aoa_savedata',
            serializeSaveData(saveDataRef.current)
        );
    }

    function clearSave() {
        localStorage.removeItem('aoa_savedata');
        setSaveData(initialSaveData);
    }

    function increaseRates(buildingName?: keyof Buildings) {
        if (!buildingName) return;

        setSaveData((prevSaveData) => {
            const newResources = { ...prevSaveData.resources };
            let newPopulation = { ...prevSaveData.population };

            const newBuildings = { ...prevSaveData.buildings };
            if (buildingName) {
                const building = newBuildings[buildingName] as ActiveBuilding;
                if (building.assigned !== undefined) {
                    if (prevSaveData.population.availableWorkers < 1) {
                        return prevSaveData;
                    }
                    newPopulation = {
                        ...prevSaveData.population,
                        availableWorkers:
                            prevSaveData.population.availableWorkers - 1,
                    };
                    newBuildings[buildingName] = {
                        ...newBuildings[buildingName],
                        assigned: building.assigned + 1,
                    };
                }
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
                ...prevSaveData,
                resources: newResources,
                population: newPopulation,
                buildings: newBuildings,
            };
        });
    }

    function decreaseRates(buildingName?: keyof Buildings) {
        if (!buildingName) return;

        setSaveData((prevSaveData) => {
            const newResources = { ...prevSaveData.resources };
            let newPopulation = { ...prevSaveData.population };

            const newBuildings = { ...prevSaveData.buildings };
            if (buildingName) {
                const building = newBuildings[buildingName] as ActiveBuilding;
                if (building.assigned !== undefined) {
                    if (building.assigned < 1) {
                        return prevSaveData;
                    }
                    newPopulation = {
                        ...prevSaveData.population,
                        availableWorkers:
                            prevSaveData.population.availableWorkers + 1,
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
                ...prevSaveData,
                resources: newResources,
                population: newPopulation,
                buildings: newBuildings,
            };
        });
    }

    function gatherResource(name: keyof Resources, amount: number = 1) {
        setSaveData((prevSaveData) => {
            const resource = prevSaveData.resources[name];
            const newAmount = Math.min(
                resource.amount + amount * prevSaveData.clickingPower,
                resource.capacity
            );

            return {
                ...prevSaveData,
                resources: {
                    ...prevSaveData.resources,
                    [name]: {
                        ...resource,
                        amount: newAmount,
                    },
                },
            };
        });
    }

    useEffect(() => {
        checkVisibilityConditions();
    }, [
        JSON.stringify(saveData.buildings),
        JSON.stringify(saveData.resources),
    ]);

    function checkVisibilityConditions() {
        setSaveData((prevSaveData) => {
            const buildings = { ...prevSaveData.buildings };
            const resources = { ...prevSaveData.resources };

            const updatedBuildings = checkBuildingConditions(
                buildings,
                resources
            );
            const updatedResources = checkResourceConditions(
                resources,
                buildings
            );

            return {
                ...prevSaveData,
                resources: updatedResources,
                buildings: updatedBuildings,
            };
        });
    }

    function purchaseBuildingIfPossible(
        buildingName: keyof Buildings,
        updates: Partial<SaveData>,
        increaseRates?: boolean
    ) {
        const buildingCost = AllBuildingData.get(buildingName)?.costs;

        if (
            buildingCost &&
            canAffordBuilding(
                saveData.buildings[buildingName],
                saveData.resources,
                buildingCost
            )
        ) {
            setSaveData((prevSaveData) => {
                const updatedResources = { ...prevSaveData.resources };

                for (const [resourceName, cost] of Object.entries(
                    buildingCost
                )) {
                    const resourceKey = resourceName as keyof Resources;
                    updatedResources[resourceKey] = {
                        ...updatedResources[resourceKey],
                        amount: updatedResources[resourceKey].amount - cost,
                    };
                }

                if (buildingName === 'commonHouse') {
                    updatedResources.food.rate +=
                        AllStaticRates.humanFoodDeduction;
                }

                if (increaseRates) {
                    Object.entries(
                        AllBuildingData.get(buildingName)?.resourcesGained ?? {}
                    ).forEach(([name, amount]) => {
                        if (amount !== undefined) {
                            const resource =
                                updatedResources[name as keyof Resources];
                            const newRate = resource.rate + amount;
                            updatedResources[name as keyof Resources] = {
                                ...resource,
                                rate: newRate,
                            };
                        }
                    });
                }

                const newSaveData = {
                    ...prevSaveData,
                    resources: updatedResources,
                    ...updates,
                };

                return newSaveData;
            });
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setSaveData((prevSaveData) => {
                const newResources = { ...prevSaveData.resources };

                Object.keys(newResources).forEach((key) => {
                    const resource = newResources[key as keyof Resources];

                    if (resource.rate !== 0) {
                        const requiredResources =
                            resource.requiresResource || [];
                        const canIncrease = requiredResources.every(
                            (reqResource) =>
                                newResources[reqResource].amount > 0
                        );

                        if (canIncrease) {
                            const newAmount =
                                resource.rate > 0
                                    ? Math.min(
                                          resource.amount + resource.rate,
                                          resource.capacity
                                      )
                                    : Math.max(
                                          resource.amount + resource.rate,
                                          0
                                      );

                            newResources[key as keyof Resources] = {
                                ...resource,
                                amount: newAmount,
                            };
                        }
                    }
                });

                return {
                    ...prevSaveData,
                    resources: newResources,
                };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <SaveDataContext.Provider
            value={{
                saveData,
                setSaveData,
                gatherResource,
                increaseRates,
                decreaseRates,
                purchaseBuildingIfPossible,
                manualSave,
                clearSave,
            }}
        >
            {children}
        </SaveDataContext.Provider>
    );
}
