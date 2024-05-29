import CustomModal from '../custom-modal/CustomModal';
import { Text, Button, Flex, Textarea, useDisclosure } from '@chakra-ui/react';
import { useContextSelector } from 'use-context-selector';
import { SaveDataContext } from '../providers/save-data-provider/SaveDataProvider';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose(): void;
}

function Settings({ isOpen, onClose }: Props) {
  const [importedSave, setImportedSave] = useState('');
  const [error, setError] = useState<Error>();
  const {
    isOpen: isErrorModalOpen,
    onClose: onErrorModalClose,
    onOpen: onErrorModalOpen,
  } = useDisclosure();
  const { importSave, manualSave, clearSave, getSaveData } = useContextSelector(
    SaveDataContext,
    (s) => {
      return {
        importSave: s.importSave,
        manualSave: s.manualSave,
        clearSave: s.clearSave,
        getSaveData: s.getSaveData,
      };
    }
  );

  function handleImportSave() {
    if (importedSave === '') return;
    try {
      importSave(importedSave);
      onClose();
    } catch (err) {
      setError(err as Error);
      onErrorModalOpen();
    }
  }

  return (
    <CustomModal
      heading="Settings"
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
    >
      <Flex direction="column" w="100%" gap={4}>
        <Flex gap={2}>
          <Button variant="primary" onClick={manualSave}>
            Save Game
          </Button>
          <Button variant="primary" onClick={clearSave}>
            Clear Save
          </Button>
          <Button
            variant="primary"
            onClick={() => navigator.clipboard.writeText(getSaveData())}
          >
            Copy Save File
          </Button>
        </Flex>
        <Flex direction="column" gap={2}>
          <Text>Import Save:</Text>
          <Textarea
            w="100%"
            onChange={(e) => setImportedSave(e.target.value)}
          />
          <Button variant="primary" w="fit-content" onClick={handleImportSave}>
            Import
          </Button>
        </Flex>
      </Flex>
      <CustomModal
        isOpen={isErrorModalOpen}
        onClose={onErrorModalClose}
        heading="Error"
      >
        <Flex direction="column" gap={4}>
          <Text>{error?.message}</Text>
          <Button
            variant="primary"
            w="fit-content"
            alignSelf="flex-end"
            onClick={onErrorModalClose}
          >
            Close
          </Button>
        </Flex>
      </CustomModal>
    </CustomModal>
  );
}

export default Settings;
