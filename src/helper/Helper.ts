import { Building, BuildingCosts } from '../interfaces/Buildings';
import { Resources } from '../interfaces/Resources';

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
        if (
            !resources[resourceKey] ||
            resources[resourceKey].amount < scaledCost
        ) {
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