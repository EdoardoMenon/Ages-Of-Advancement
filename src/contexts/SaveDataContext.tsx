import { ReactNode, createContext, useState, useEffect } from 'react';
import { SaveData } from '../interfaces/SaveData';
import { initialSaveData } from './InitialSaveData';
import { Resources } from '../interfaces/Resources';
import { Buildings } from '../interfaces/Buildings';
import { canAffordBuilding } from '../helper/Helper';
import { AllBuildingData } from '../static/BuildingCosts';
import { AllStaticRates } from '../static/StaticRates';

interface StateType {
    saveData: SaveData;
    setSaveData: React.Dispatch<React.SetStateAction<SaveData>>;
    gatherResource(name: keyof Resources, amount?: number): void;
    increaseRate(name: keyof Resources, amount: number): void;
    purchaseBuildingIfPossible(
        buildingName: keyof Buildings,
        updates: Partial<SaveData>,
        decreaseFood?: boolean
    ): void;
}

export const SaveDataContext = createContext<StateType>({} as StateType);

export function SaveDataProvider({ children }: { children: ReactNode }) {
    const [saveData, setSaveData] = useState<SaveData>(initialSaveData);

    function increaseRate(name: keyof Resources, amount: number) {
        setSaveData((prevSaveData) => {
            const resource = prevSaveData.resources[name];
            const newAmount = resource.rate + amount;

            return {
                ...prevSaveData,
                resources: {
                    ...prevSaveData.resources,
                    [name]: {
                        ...resource,
                        rate: newAmount,
                    },
                },
            };
        });
    }

    function gatherResource(name: keyof Resources, amount: number = 1) {
        setSaveData((prevSaveData) => {
            const resource = prevSaveData.resources[name];
            const newAmount = Math.min(
                resource.amount + amount * saveData.clickingPower,
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

    function purchaseBuildingIfPossible(
        buildingName: keyof Buildings,
        updates: Partial<SaveData>,
        decreaseFood?: boolean
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

                if (decreaseFood) {
                    updatedResources.food.rate +=
                        AllStaticRates.humanFoodDeduction;
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
                        const newAmount =
                            resource.rate > 0
                                ? Math.min(
                                      resource.amount + resource.rate,
                                      resource.capacity
                                  )
                                : Math.max(resource.amount + resource.rate, 0);

                        newResources[key as keyof Resources] = {
                            ...resource,
                            amount: newAmount,
                        };
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
                increaseRate,
                purchaseBuildingIfPossible,
            }}
        >
            {children}
        </SaveDataContext.Provider>
    );
}
