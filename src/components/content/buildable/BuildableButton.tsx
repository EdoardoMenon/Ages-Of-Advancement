import { useContext } from 'react';
import { splitCamelCase } from '../../../helper/Helper';
import { ActiveBuilding, Buildings } from '../../../interfaces/Buildings';
import { AllBuildingData } from '../../../static/BuildingData';
import HoverPopupExpandable from '../../hover-popup/HoverPopupExpandable';
import BuildingPopup from './BuildingPopup';
import { Button } from '@chakra-ui/react';
import { SaveDataContext } from '../../../contexts/SaveDataContext';

interface Props {
  buildingName: keyof Buildings;
}

function BuildableButton({ buildingName }: Props) {
  const { saveData, purchaseBuildingIfPossible } = useContext(SaveDataContext);

  const building = saveData.buildings[buildingName];

  if (building.isHidden) return null;

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

          const typedBuildingName = buildingName as keyof Buildings;
          const buildingData = AllBuildingData.get(typedBuildingName);

          let updates = {
            buildings: {
              ...saveData.buildings,
              [typedBuildingName]: {
                ...saveData.buildings[typedBuildingName],
                owned: saveData.buildings[typedBuildingName].owned + 1,
              },
            },
          };
          if (buildingData?.saveDataUpdates) {
            updates = {
              ...updates,
              ...buildingData.saveDataUpdates(saveData),
            };
          }
          const activeBuilding = building as ActiveBuilding;
          const isPassiveBuilding = activeBuilding.assigned === undefined;
          purchaseBuildingIfPossible(
            typedBuildingName,
            updates,
            isPassiveBuilding
          );
        }}
      >
        {splitCamelCase(buildingName)}
      </Button>
    </HoverPopupExpandable>
  );
}

export default BuildableButton;
