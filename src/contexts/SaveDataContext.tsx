import { ReactNode, createContext, useState, useEffect } from 'react';
import { SaveData } from '../interfaces/SaveData';
import { initialSaveData } from './InitialSaveData';
import { Resources } from '../interfaces/Resources';

interface StateType {
    saveData: SaveData;
    setSaveData: React.Dispatch<React.SetStateAction<SaveData>>;
    gatherResource(name: keyof Resources, amount?: number): void;
    increaseRate(name: keyof Resources, amount: number): void;
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
                resource.amount + amount,
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
        const interval = setInterval(() => {
            setSaveData((prevSaveData) => {
                const newResources = { ...prevSaveData.resources };

                Object.keys(newResources).forEach((key) => {
                    const resource = newResources[key as keyof Resources];
                    if (resource.rate > 0) {
                        const newAmount = Math.min(
                            resource.amount + resource.rate,
                            resource.capacity
                        );
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
            value={{ saveData, setSaveData, gatherResource, increaseRate }}
        >
            {children}
        </SaveDataContext.Provider>
    );
}
