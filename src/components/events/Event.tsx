import { Text, TextProps } from '@chakra-ui/react'

interface Props extends TextProps {
    time: string, event: string
}

function Event({ time, event, ...textProps }: Props) {
    return (
        <Text {...textProps} fontSize="xs">[{time}] {event}</Text>
    )
}

export default Event