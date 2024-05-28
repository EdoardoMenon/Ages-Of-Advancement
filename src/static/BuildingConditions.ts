import { Buildings } from '../interfaces/Buildings';
import { Resources } from '../interfaces/Resources';

export function checkBuildingConditions(
  buildings: Buildings,
  resources: Resources
): Buildings {
  //Lumbermill, farm, stone quarry
  if (buildings.commonHouse.owned > 0) {
    buildings.lumbermill.isHidden = false;
    buildings.farm.isHidden = false;
    buildings.stoneQuarry.isHidden = false;
  }
  //School
  if (
    buildings.lumbermill.owned > 0 &&
    buildings.stoneQuarry.owned > 0 &&
    buildings.farm.owned > 0
  ) {
    buildings.school.isHidden = false;
  }
  //Common House
  if (resources.lumber.amount >= 10 && resources.stone.amount >= 10) {
    buildings.commonHouse.isHidden = false;
  }

  return buildings;
}
