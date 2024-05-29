import { SaveData } from '../../../interfaces/SaveData';
import { initialSaveData } from '../../../static/InitialSaveData';
import {
  PurchaseBuildingAction,
  checkVisibilityConditions,
  purchaseBuildingIfPossible,
} from './Purchase';
import {
  DecreaseRatesAction,
  GatherResourceAction,
  IncreaseRatesAction,
  decreaseRates,
  gatherResource,
  increaseRates,
  incrementResources,
} from './Rates';
import { PurchaseResearchAction, purchaseResearch } from './Research';

interface ImportSaveAction {
  type: 'importSave';
  payload: SaveData;
}

interface ClearSaveAction {
  type: 'clearSave';
}

interface CheckVisibilityConditionsAction {
  type: 'checkVisibilityConditions';
}

interface IncrementResourcesAction {
  type: 'incrementResources';
}

export type SaveDataActions =
  | IncreaseRatesAction
  | DecreaseRatesAction
  | PurchaseBuildingAction
  | GatherResourceAction
  | ClearSaveAction
  | CheckVisibilityConditionsAction
  | IncrementResourcesAction
  | PurchaseResearchAction
  | ImportSaveAction;

export function saveDataReducer(
  saveData: SaveData,
  action: SaveDataActions
): SaveData {
  switch (action.type) {
    case 'incrementResources':
      return incrementResources(saveData);
    case 'checkVisibilityConditions':
      return checkVisibilityConditions(saveData);
    case 'increaseRates':
      return increaseRates(saveData, action.payload);
    case 'decreaseRates':
      return decreaseRates(saveData, action.payload);
    case 'purchaseBuildingIfPossible':
      return purchaseBuildingIfPossible(
        saveData,
        action.payload.buildingName,
        action.payload.updates,
        action.payload.increaseRates
      );
    case 'gatherResource':
      return gatherResource(
        saveData,
        action.payload.name,
        action.payload.amount
      );
    case 'purchaseResearch':
      return purchaseResearch(saveData, action.payload);
    case 'importSave':
      return action.payload;
    case 'clearSave':
      return initialSaveData;
    default:
      return saveData;
  }
}
