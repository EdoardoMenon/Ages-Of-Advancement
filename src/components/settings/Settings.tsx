import { useContext } from 'react';
import CustomModal from '../custom-modal/CustomModal';
import { SaveDataContext } from '../../contexts/SaveDataContext';
import { Button, Flex } from '@chakra-ui/react';

interface Props {
    isOpen: boolean;
    onClose(): void;
}

function Settings({ isOpen, onClose }: Props) {
    const { manualSave, clearSave } = useContext(SaveDataContext);

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
