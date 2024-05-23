import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        gold: Palette['primary'];
        green: Palette['primary'];
        red: Palette['primary'];
        silver: Palette['primary'];
    }
    interface PaletteOptions {
        gold?: PaletteOptions['primary'];
        green?: PaletteOptions['primary'];
        red?: PaletteOptions['primary'];
        silver?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/SvgIcon' {
    interface SvgIconPropsColorOverrides {
        gold: true;
        green: true;
        red: true;
        silver: true;
    }
}

export const muiTheme = createTheme({
    palette: {
        gold: {
            main: '#f59e0b',
        },
        green: {
            main: '#16a34a',
        },
        red: {
            main: '#dc2626',
        },
        silver: {
            main: '#9ca3af',
        },
    },
});
