import { Box, Flex, HStack, Heading, VStack } from '@chakra-ui/react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import HoverPopup from '../hover-popup/HoverPopup';

function Navbar() {
    return (
        <VStack w="100%" p={2} py={3}>
            <Flex
                w="100%"
                direction={{ base: 'column', md: 'row' }}
                alignItems="center"
                justifyContent={{ base: 'center', md: 'space-between' }}
                position="relative"
            >
                <Heading size="lg" mb={{ base: 3, md: 0 }}>
                    Ages of Advancement
                </Heading>
                <HStack gap={5} mb={{ base: 3, md: 0 }}>
                    <HoverPopup text="hi">
                        <Heading size="md" color="assorted.green">Humans</Heading>
                    </HoverPopup>
                    <Heading size="md" color="assorted.gold">Aliens</Heading>
                </HStack>
                <HStack gap={4} w={{ base: '100%', md: 'auto' }} justifyContent={{ base: 'center', md: 'flex-end' }} mr={{ base: 0, md: 8 }}>
                    <HoverPopup text="Achievements" textColor="assorted.gold">
                        <EmojiEventsIcon fontSize='medium' color="gold" />
                    </HoverPopup>
                    <HoverPopup text="Statistics" textColor="assorted.green">
                        <BarChartIcon fontSize='medium' color="green" />
                    </HoverPopup>
                    <HoverPopup text="Settings" textColor="assorted.silver">
                        <SettingsIcon fontSize='medium' color="silver" />
                    </HoverPopup>
                </HStack>
            </Flex>
            <Box h="2px" w="100%" className="horizontal-line" />
        </VStack>
    );
}

export default Navbar;
