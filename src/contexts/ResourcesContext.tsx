import { ReactNode, createContext, useState } from "react";
import { Resources } from "../interfaces/Resource";

interface StateType {
    resources: Resources;
    setResources: React.Dispatch<React.SetStateAction<Resources>>;
}

const initialResources: Resources = {
    wood: 0
}

export const ResourceContext = createContext<StateType>({} as StateType);

export function ResourceProvider({ children }: { children: ReactNode }) {
    const [resources, setResources] = useState<Resources>(initialResources);

    return (
        <ResourceContext.Provider value={{ resources, setResources }}>{children}</ResourceContext.Provider>
    )
}