import { splitCamelCase } from '../../../helper/Helper';
import { Buildings } from '../../../interfaces/Buildings';
import HoverPopupExpandable from '../../hover-popup/HoverPopupExpandable';
import BuildingPopup from './BuildingPopup';
import { Button } from '@chakra-ui/react';

interface Props {
    description: string;
    buildingName: keyof Buildings;
    purchaseOnClick(): void;
}

function BuildableButton({
    description,
    buildingName,
    purchaseOnClick,
}: Props) {
    return (
        <HoverPopupExpandable
            content={
                <BuildingPopup
                    description={description}
                    buildingName={buildingName}
                />
            }
        >
            <Button
                variant="primary"
                onClick={(e) => {
                    e.stopPropagation();
                    purchaseOnClick();
                }}
            >
                {splitCamelCase(buildingName)}
            </Button>
        </HoverPopupExpandable>
    );
}

export default BuildableButton;
