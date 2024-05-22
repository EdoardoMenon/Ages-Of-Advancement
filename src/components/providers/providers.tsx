import { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../shared/theme';
import { ResourceProvider } from '../../contexts/ResourcesContext';


function Providers({ children }: { children: ReactNode }) {
    return (
        <ChakraProvider theme={theme}>
            <ResourceProvider>
                {children}
            </ResourceProvider>
        </ChakraProvider>

    );
}

export default Providers;
