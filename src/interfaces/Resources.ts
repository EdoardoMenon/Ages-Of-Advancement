export interface Resources {
    research: Resource;
    lumber: Resource;
    gold: Resource;
    food: Resource;
    stone: Resource;
    copper: Resource;
    iron: Resource;
    tin: Resource;
}

export interface Resource {
    amount: number;
    capacity: number;
    rate: number;
    isHidden: boolean;
}
