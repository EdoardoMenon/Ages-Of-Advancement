import { PlacementWithLogical, Text, ResponsiveValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Property } from 'csstype';
import HoverPopupExpandable from './HoverPopupExpandable';

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
    return (
        <HoverPopupExpandable
            placement={placement}
            content={<Text color={textColor}>{text}</Text>}
            offset={offset}
            textColor={textColor}
        >
            {children}
        </HoverPopupExpandable>
    );
}

export default HoverPopup;
