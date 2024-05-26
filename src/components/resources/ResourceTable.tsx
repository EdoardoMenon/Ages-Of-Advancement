import { Table, Tbody, Td, Tr } from '@chakra-ui/react';
import { useContext } from 'react';
import { SaveDataContext } from '../../contexts/SaveDataContext';
import { capitaliseFirstLetter } from '../../helper/Helper';
import { Resource } from '../../interfaces/Resources';

function ResourceTable() {
    const { saveData } = useContext(SaveDataContext);

    return (
        <Table variant="darkStriped">
            <Tbody
                border="solid 2px"
                borderColor="light-background.400"
                borderTop={{ lg: 'none' }}
            >
                {Object.entries(saveData.resources).map(
                    ([key, value]: [key: string, value: Resource]) => {
                        if (!value.isHidden)
                            return (
                                <Tr key={key}>
                                    <Td>{capitaliseFirstLetter(key)}</Td>
                                    <Td w="300px">
                                        {Math.round(value.amount)}/
                                        {value.capacity}
                                    </Td>
                                    <Td w="150px">{value.rate}/s</Td>
                                </Tr>
                            );
                    }
                )}
            </Tbody>
        </Table>
    );
}

export default ResourceTable;
