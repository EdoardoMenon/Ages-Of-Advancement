import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    Flex,
    PlacementWithLogical,
    ResponsiveValue,
} from '@chakra-ui/react';
import { useState, useRef, ReactNode } from 'react';
import { Property } from 'csstype';

function HoverPopupExpandable({
    children,
    placement = 'bottom',
    offset = [0, 10],
    content,
}: {
    children: ReactNode;
    placement?: PlacementWithLogical;
    offset?: [number, number];
    textColor?: ResponsiveValue<Property.Color>;
    content: ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const open = () => {
        setIsOpen(true);
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }
    };

    const close = () => {
        timeoutRef.current = setTimeout(() => setIsOpen(false), 25);
    };

    return (
        <Flex justifyContent="center" alignItems="center">
            <Popover
                isOpen={isOpen}
                onClose={close}
                placement={placement}
                closeOnBlur={false}
                offset={offset}
            >
                <PopoverTrigger>
                    <div onMouseEnter={open} onMouseLeave={close}>
                        {children}
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    backgroundColor="light-background.500"
                    width="auto"
                    minWidth="fit-content"
                >
                    <PopoverArrow />
                    <PopoverBody>{content}</PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    );
}

export default HoverPopupExpandable;
