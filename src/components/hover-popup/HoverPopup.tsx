import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    Flex,
    PlacementWithLogical,
    Text,
    ResponsiveValue,
    useDisclosure,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Property } from 'csstype';

interface Props {
    children: ReactNode;
    text: string;
    placement?: PlacementWithLogical;
    offset?: [number, number];
    textColor?: ResponsiveValue<Property.Color>;
}

function HoverPopup({
    children,
    text,
    placement = 'bottom',
    offset = [0, 10],
    textColor,
}: Props) {
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <Flex justifyContent="center" alignItems="center">
            <Popover
                isOpen={isOpen}
                onClose={onClose}
                placement={placement}
                closeOnBlur={false}
                offset={offset}
            >
                <PopoverTrigger>
                    <div onMouseEnter={onOpen} onMouseLeave={onClose}>
                        {children}
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    backgroundColor="light-background.500"
                    width="auto"
                    minWidth="fit-content"
                >
                    <PopoverArrow />
                    <PopoverBody>
                        <Text color={textColor}>{text}</Text>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    );
}

export default HoverPopup;
