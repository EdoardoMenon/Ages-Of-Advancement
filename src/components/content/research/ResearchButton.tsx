import { Button } from '@chakra-ui/react';
import { Research } from '../../../interfaces/Research';
import HoverPopupExpandable from '../../hover-popup/HoverPopupExpandable';
import ResearchPopup from './ResearchPopup';
import { splitCamelCase } from '../../../helper/Helper';

interface Props {
    description: string;
    researchName: keyof Research;
    purchaseOnClick(): void;
}

function ResearchButton({ description, researchName, purchaseOnClick }: Props) {
    return (
        <HoverPopupExpandable
            content={
                <ResearchPopup
                    description={description}
                    researchName={researchName}
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
                {splitCamelCase(researchName)}
            </Button>
        </HoverPopupExpandable>
    );
}

export default ResearchButton;
