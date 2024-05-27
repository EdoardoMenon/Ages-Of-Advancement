import { ReactNode, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { ArrowContainer, Popover } from 'react-tiny-popover';

interface Props {
    children: ReactNode;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    textColor?: string;
    content: ReactNode;
}

function HoverPopupExpandable({
    children,
    placement = 'bottom',
    content,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <Flex justifyContent="center" alignItems="center">
            <Popover
                isOpen={isOpen}
                positions={[placement]}
                content={({ position, childRect, popoverRect }) => (
                    <ArrowContainer
                        position={position}
                        childRect={childRect}
                        popoverRect={popoverRect}
                        arrowColor="white"
                        arrowSize={8}
                        arrowStyle={{ opacity: 0.7 }}
                    >
                        <Box
                            backgroundColor="light-background.500"
                            border="solid white 2px"
                            width="auto"
                            minWidth="fit-content"
                            padding="1rem"
                            boxShadow="md"
                            borderRadius="md"
                        >
                            {content}
                        </Box>
                    </ArrowContainer>
                )}
            >
                <Box
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {children}
                </Box>
            </Popover>
        </Flex>
    );
}

export default HoverPopupExpandable;
