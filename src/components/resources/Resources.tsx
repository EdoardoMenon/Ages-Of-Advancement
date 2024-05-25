import { Box } from '@chakra-ui/react';
import ResourceTable from './ResourceTable';

function Resources() {
    return (
        <Box w="100%" p={{ base: 3, lg: 0 }}>
            <ResourceTable />
        </Box>
    );
}

export default Resources;
