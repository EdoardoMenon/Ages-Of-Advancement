import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    Flex,
    PlacementWithLogical,
    ResponsiveValue,
    useDisclosure,
    Box,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Property } from 'csstype';

interface Props {
    children: ReactNode;
    placement?: PlacementWithLogical;
    offset?: [number, number];
    textColor?: ResponsiveValue<Property.Color>;
    content: ReactNode;
}

function HoverPopupExpandable({
    children,
    placement = 'bottom',
    offset = [0, 10],
    content,
}: Props) {
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <Flex justifyContent="center" alignItems="center">
            <Popover
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                openDelay={0}
                closeDelay={1}
                placement={placement}
                closeOnBlur={false}
                offset={offset}
                key={Math.random()}
            >
                <PopoverTrigger>
                    <Box onMouseEnter={onOpen} onMouseOut={onClose}>
                        {children}
                    </Box>
                </PopoverTrigger>
                <PopoverContent
                    backgroundColor="light-background.500"
                    width="auto"
                    minWidth="fit-content"
                >
                    <PopoverArrow />
                    <PopoverBody onMouseOver={onClose}>{content}</PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    );
}

export default HoverPopupExpandable;
