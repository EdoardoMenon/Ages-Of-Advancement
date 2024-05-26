import { Buildings } from '../interfaces/Buildings';
import { Resources } from '../interfaces/Resources';

export function checkResourceConditions(
    resources: Resources,
    buildings: Buildings
): Resources {
    //Research
    if (!buildings.school.isHidden) {
        resources.research.isHidden = false;
    }

    return resources;
}
