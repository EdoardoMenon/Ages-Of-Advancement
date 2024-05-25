import {
    ChakraTheme,
    cssVar,
    extendTheme,
    theme as defaultTheme,
    createMultiStyleConfigHelpers,
} from '@chakra-ui/react';
import { tabsAnatomy } from '@chakra-ui/anatomy';
import { tableAnatomy } from '@chakra-ui/anatomy';

const toColorVar = (name: string, shade?: number | string) =>
    cssVar(
        `colors-${name}${shade ? `-${shade}` : ''}`,
        undefined,
        defaultTheme.config.cssVarPrefix
    ).reference;

const fonts: ChakraTheme['fonts'] = {
    body: 'Inter, Arial, sans-serif',
    heading: 'Inter, Arial, sans-serif',
};

const styles: ChakraTheme['styles'] = {
    global: {
        body: {
            color: 'primaryFontColor',
        },
        h1: {
            color: 'primaryFontColor',
        },
        h2: {
            color: 'primaryFontColor',
        },
        h3: {
            color: 'primaryFontColor',
        },
        h4: {
            color: 'primaryFontColor',
        },
    },
};

const colors: ChakraTheme['colors'] = {
    primaryFontColor: toColorVar('white', 500),

    assorted: {
        gold: '#f59e0b',
        green: '#16a34a',
        red: '#dc2626',
        silver: '#9ca3af',
    },

    black: {
        DEFAULT: '#000000',
        50: '#5C5C5C',
        100: '#525252',
        200: '#3D3D3D',
        300: '#292929',
        400: '#141414',
        500: '#000000',
        600: '#000000',
        700: '#000000',
        800: '#000000',
        900: '#000000',
        950: '#000000',
    },
    white: {
        DEFAULT: '#FFFFFF',
        50: '#FFFFFF',
        100: '#FFFFFF',
        200: '#FFFFFF',
        300: '#FFFFFF',
        400: '#FFFFFF',
        500: '#FFFFFF',
        600: '#E3E3E3',
        700: '#C7C7C7',
        800: '#ABABAB',
        900: '#8F8F8F',
        950: '#818181',
    },
    primary: {
        DEFAULT: '#1A202C',
        50: '#5E749F',
        100: '#576B93',
        200: '#475879',
        300: '#38455F',
        400: '#293346',
        500: '#1A202C',
        600: '#050609',
        700: '#000000',
        800: '#000000',
        900: '#000000',
        950: '#000000',
    },
    'light-background': {
        DEFAULT: '#1F2732',
        50: '#6880A1',
        100: '#5D7697',
        200: '#4E627E',
        300: '#3E4E64',
        400: '#2F3B4B',
        500: '#1F2732',
        600: '#0A0C0F',
        700: '#000000',
        800: '#000000',
        900: '#000000',
        950: '#000000',
    },
    'active-background': {
        DEFAULT: '#212B3A',
        50: '#6983AA',
        100: '#5C78A2',
        200: '#4D6588',
        300: '#3F526E',
        400: '#303E54',
        500: '#212B3A',
        600: '#0D1016',
        700: '#000000',
        800: '#000000',
        900: '#000000',
        950: '#000000',
    },
};

const {
    definePartsStyle: defineTabsStyle,
    defineMultiStyleConfig: defineTabsConfig,
} = createMultiStyleConfigHelpers(tabsAnatomy.keys);

const {
    definePartsStyle: defineTableStyle,
    defineMultiStyleConfig: defineTableConfig,
} = createMultiStyleConfigHelpers(tableAnatomy.keys);

const baseStyleTabs = defineTabsStyle(() => ({
    tab: {
        _active: {
            backgroundColor: 'primary.500',
        },
        _selected: {
            color: 'assorted.green',
        },
    },
}));

const baseStyleTable = defineTableStyle(() => ({
    table: {
        bg: 'light-background.500',
    },
    tbody: {
        tr: {
            '&:nth-of-type(odd)': {
                bg: 'primary.500',
            },
            color: 'white',
        },
    },
}));

const theme = extendTheme({
    fonts,
    styles,
    colors,
    components: {
        Button: {
            variants: {
                primary: {
                    bg: 'primary.500',
                    border: 'solid white 2px',
                    borderRadius: '2xl',
                    _hover: {
                        color: 'white.500',
                        bg: 'primary.400',
                    },
                    _active: {
                        color: 'white.300',
                        bg: 'primary.300',
                    },
                },
            },
        },
        Tabs: defineTabsConfig({
            baseStyle: baseStyleTabs,
        }),
        Table: defineTableConfig({
            variants: {
                darkStriped: baseStyleTable,
            },
        }),
    },
});

export default theme;
