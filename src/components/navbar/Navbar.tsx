import { Flex, HStack, Heading, useDisclosure } from '@chakra-ui/react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import HoverPopup from '../hover-popup/HoverPopup';
import Settings from '../settings/Settings';

function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex
            w="100%"
            direction={{ base: 'column', lg: 'row' }}
            alignItems="center"
            justifyContent={{ base: 'center', lg: 'space-between' }}
            position="relative"
            backgroundColor="light-background.500"
            borderBottom="solid 2px"
            borderColor="light-background.400"
            p={2}
            py={3}
        >
            <Heading size="lg" mb={{ base: 3, lg: 0 }}>
                Ages of Advancement
            </Heading>
            <HStack gap={5} mb={{ base: 3, lg: 0 }}>
                <HoverPopup text="hi">
                    <Heading size="md" color="assorted.green">
                        Humans
                    </Heading>
                </HoverPopup>
                <Heading size="md" color="assorted.gold">
                    Aliens
                </Heading>
            </HStack>
            <HStack
                gap={4}
                w={{ base: '100%', lg: 'auto' }}
                justifyContent={{ base: 'center', lg: 'flex-end' }}
                mr={{ base: 0, lg: 8 }}
            >
                <HoverPopup text="Achievements" textColor="assorted.gold">
                    <EmojiEventsIcon fontSize="medium" color="gold" />
                </HoverPopup>
                <HoverPopup text="Statistics" textColor="assorted.green">
                    <BarChartIcon fontSize="medium" color="green" />
                </HoverPopup>
                <HoverPopup text="Settings" textColor="assorted.silver">
                    <SettingsIcon
                        fontSize="medium"
                        color="silver"
                        onClick={onOpen}
                    />
                </HoverPopup>
            </HStack>
            <Settings isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
}

export default Navbar;
