import {
    ChakraTheme,
    cssVar,
    extendTheme,
    theme as defaultTheme,
} from '@chakra-ui/react';

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
            color: 'darkFontColor',
        },
        h2: {
            color: 'darkFontColor',
        },
        h3: {
            color: 'extraDarkFontColor',
        },
        h4: {
            color: 'extraDarkFontColor',
        },
    },
};

const colors: ChakraTheme['colors'] = {
    primaryFontColor: toColorVar('gray', 500),
    darkFontColor: '#2E3646',
    extraDarkFontColor: '#141414',

    assorted: {
        sidebarFill: '#F8F9FB',
    },

    gray: {
        50: '#C3CAD2',
        100: '#B7BFC9',
        200: '#A0ABB7',
        300: '#8996A6',
        400: '#718194',
        500: '#5F6D7E', // primaryFontColor
        600: '#47515E',
        700: '#2F363E',
        800: '#171A1E',
        900: '#000000',
        950: '#000000',
    },
};

const theme = extendTheme({
    fonts,
    styles,
    colors,
    components: {
        Button: {
            variants: {
                linkButton: {
                    bg: 'transparent',
                    color: 'filter-blue.500',
                    textDecoration: 'underline',
                    _hover: {
                        bg: 'transparent',
                        color: 'filter-blue.600',
                    },
                    _active: {
                        bg: 'transparent',
                        color: 'filter-blue.700',
                    },
                },
            },
        },
    },
});

export default theme;

