import CustomModal from '../custom-modal/CustomModal';
import { Button, Flex } from '@chakra-ui/react';
import { useContextSelector } from 'use-context-selector';
import { SaveDataContext } from '../providers/save-data-provider/SaveDataProvider';

interface Props {
  isOpen: boolean;
  onClose(): void;
}

function Settings({ isOpen, onClose }: Props) {
  const { manualSave, clearSave } = useContextSelector(SaveDataContext, (s) => {
    return {
      manualSave: s.manualSave,
      clearSave: s.clearSave,
    };
  });

  return (
    <CustomModal
      heading="Settings"
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
    >
      <Flex direction="column" w="fit-content" gap={2}>
        <Flex gap={2}>
          <Button variant="primary" onClick={manualSave}>
            Save Game
          </Button>
          <Button variant="primary" onClick={clearSave}>
            Clear Save
          </Button>
        </Flex>
      </Flex>
    </CustomModal>
  );
}

export default Settings;
