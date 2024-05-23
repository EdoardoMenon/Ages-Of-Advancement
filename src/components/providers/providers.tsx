import { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../shared/theme';
import { SaveDataProvider } from '../../contexts/SaveDataContext';
import { ThemeProvider } from '@emotion/react';
import { muiTheme } from '../../shared/muiTheme';


function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider theme={muiTheme}>
            <ChakraProvider theme={theme}>
                <SaveDataProvider>
                    {children}
                </SaveDataProvider>
            </ChakraProvider>
        </ThemeProvider>

    );
}

export default Providers;
