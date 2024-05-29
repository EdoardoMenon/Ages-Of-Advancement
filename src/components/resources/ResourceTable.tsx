import { Table, Tbody, Td, Tr } from '@chakra-ui/react';
import { capitaliseFirstLetter } from '../../helper/Helper';
import { Resource } from '../../interfaces/Resources';
import { useContextSelector } from 'use-context-selector';
import { SaveDataContext } from '../providers/save-data-provider/SaveDataProvider';

function ResourceTable() {
  const resources = useContextSelector(
    SaveDataContext,
    (s) => s.state.resources
  );

  return (
    <Table variant="darkStriped">
      <Tbody
        border="solid 2px"
        borderColor="light-background.400"
        borderTop={{ lg: 'none' }}
      >
        {Object.entries(resources).map(
          ([key, value]: [key: string, value: Resource]) => {
            if (!value.isHidden)
              return (
                <Tr key={key}>
                  <Td>{capitaliseFirstLetter(key)}</Td>
                  <Td w="300px">
                    {Math.round(value.amount)}/{value.capacity}
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
