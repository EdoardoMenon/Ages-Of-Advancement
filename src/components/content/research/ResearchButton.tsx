import { Button } from '@chakra-ui/react';
import { Research } from '../../../interfaces/Research';
import HoverPopupExpandable from '../../hover-popup/HoverPopupExpandable';
import ResearchPopup from './ResearchPopup';
import { splitCamelCase } from '../../../helper/Helper';
import { AllResearchData } from '../../../static/ResearchData';
import { useContextSelector } from 'use-context-selector';
import { SaveDataContext } from '../../providers/save-data-provider/SaveDataProvider';

interface Props {
  researchName: keyof Research;
}

function ResearchButton({ researchName }: Props) {
  const dispatch = useContextSelector(SaveDataContext, (s) => s.dispatch);

  return (
    <HoverPopupExpandable
      content={
        <ResearchPopup
          description={AllResearchData.get(researchName)?.description ?? ''}
          researchName={researchName}
        />
      }
    >
      <Button
        variant="primary"
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: 'purchaseResearch', payload: researchName });
        }}
      >
        {splitCamelCase(researchName)}
      </Button>
    </HoverPopupExpandable>
  );
}

export default ResearchButton;
