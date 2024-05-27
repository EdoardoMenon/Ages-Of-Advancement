import { Text, ResponsiveValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Property } from 'csstype';
import HoverPopupExpandable from './HoverPopupExpandable';

interface Props {
    children: ReactNode;
    text: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    textColor?: ResponsiveValue<Property.Color>;
}

function HoverPopup({
    children,
    text,
    placement = 'bottom',
    textColor,
}: Props) {
    return (
        <HoverPopupExpandable
            placement={placement}
            content={<Text color={textColor}>{text}</Text>}
        >
            {children}
        </HoverPopupExpandable>
    );
}

export default HoverPopup;
