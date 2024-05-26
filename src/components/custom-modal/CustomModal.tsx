import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends ModalProps {
    isOpen: boolean;
    heading: string;
    onClose(): void;
    children: ReactNode;
}

function CustomModal({
    children,
    heading,
    isOpen,
    onClose,
    ...modalProps
}: Props) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} {...modalProps}>
            <ModalOverlay />
            <ModalContent
                backgroundColor="primary.500"
                borderColor="red"
                border="solid 2px"
            >
                <ModalCloseButton />
                <ModalHeader>{heading}</ModalHeader>
                <ModalBody mb={2}>{children}</ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default CustomModal;
