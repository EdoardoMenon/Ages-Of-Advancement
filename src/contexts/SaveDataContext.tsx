import { ReactNode, createContext, useState } from "react";
import { SaveData } from "../interfaces/SaveData";
import { initialSaveData } from "./InitialSaveData";

interface StateType {
    saveData: SaveData;
    setSaveData: React.Dispatch<React.SetStateAction<SaveData>>;
}

export const SaveDataContext = createContext<StateType>({} as StateType);

export function SaveDataProvider({ children }: { children: ReactNode }) {
    const [saveData, setSaveData] = useState<SaveData>(initialSaveData);

    return (
        <SaveDataContext.Provider value={{ saveData, setSaveData }}>{children}</SaveDataContext.Provider>
    )
}