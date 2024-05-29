import { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../shared/theme';
import { ThemeProvider } from '@emotion/react';
import { muiTheme } from '../../shared/muiTheme';
import SaveDataProvider from './save-data-provider/SaveDataProvider';

function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={muiTheme}>
      <ChakraProvider theme={theme}>
        <SaveDataProvider>{children}</SaveDataProvider>
      </ChakraProvider>
    </ThemeProvider>
  );
}

export default Providers;
