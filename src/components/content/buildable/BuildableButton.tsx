import { splitCamelCase } from '../../../helper/Helper';
import { ActiveBuilding, Buildings } from '../../../interfaces/Buildings';
import { AllBuildingData } from '../../../static/BuildingData';
import HoverPopupExpandable from '../../hover-popup/HoverPopupExpandable';
import BuildingPopup from './BuildingPopup';
import { Button } from '@chakra-ui/react';
import { useContextSelector } from 'use-context-selector';
import { SaveDataContext } from '../../providers/save-data-provider/SaveDataProvider';

interface Props {
  buildingName: keyof Buildings;
}

function BuildableButton({ buildingName }: Props) {
  const saveData = useContextSelector(SaveDataContext, (s) => s.state);
  const buildings = saveData.buildings;
  const dispatch = useContextSelector(SaveDataContext, (s) => s.dispatch);

  if (buildings[buildingName].isHidden) return null;

  return (
    <HoverPopupExpandable
      content={
        <BuildingPopup
          description={AllBuildingData.get(buildingName)?.description ?? ''}
          buildingName={buildingName}
        />
      }
    >
      <Button
        variant="primary"
        onClick={(e) => {
          e.stopPropagation();
          const buildingData = AllBuildingData.get(buildingName);

          let updates = {
            buildings: {
              ...buildings,
              [buildingName]: {
                ...buildings[buildingName],
                owned: buildings[buildingName].owned + 1,
              },
            },
          };
          if (buildingData?.saveDataUpdates) {
            updates = {
              ...updates,
              ...buildingData.saveDataUpdates(saveData),
            };
          }
          const activeBuilding = buildings[buildingName] as ActiveBuilding;
          const isPassiveBuilding = activeBuilding.assigned === undefined;
          dispatch({
            type: 'purchaseBuildingIfPossible',
            payload: {
              buildingName,
              updates,
              increaseRates: isPassiveBuilding,
            },
          });
        }}
      >
        {splitCamelCase(buildingName)}
      </Button>
    </HoverPopupExpandable>
  );
}

export default BuildableButton;
