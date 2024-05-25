import { Button, Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import BuildableContainer from './BuildableContainer';
import { SaveDataContext } from '../../../contexts/SaveDataContext';
import HoverPopupExpandable from '../../hover-popup/HoverPopupExpandable';
import BuildingPopup from './BuildingPopup';

function Buildables() {
    const { saveData, gatherResource, purchaseBuildingIfPossible } =
        useContext(SaveDataContext);

    return (
        <Flex direction="column" gap={4}>
            <BuildableContainer headingName="Gathering">
                <Flex gap={4}>
                    <Button
                        variant="primary"
                        onClick={() => gatherResource('food')}
                    >
                        Gather Food
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => gatherResource('lumber')}
                    >
                        Gather Lumber
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => gatherResource('stone')}
                    >
                        Gather Stone
                    </Button>
                </Flex>
            </BuildableContainer>
            <BuildableContainer headingName="Houses">
                <Flex gap={4}>
                    <HoverPopupExpandable
                        content={
                            <BuildingPopup
                                description="A common house for residents to live in"
                                buildingName="commonHouses"
                            />
                        }
                    >
                        <Button
                            variant="primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                purchaseBuildingIfPossible('commonHouses', {
                                    population: {
                                        ...saveData.population,
                                        maxWorkers:
                                            saveData.population.maxWorkers + 1,
                                        availableWorkers:
                                            saveData.population.maxWorkers + 1,
                                    },
                                    buildings: {
                                        ...saveData.buildings,
                                        commonHouses: {
                                            ...saveData.buildings.commonHouses,
                                            owned:
                                                saveData.buildings.commonHouses
                                                    .owned + 1,
                                        },
                                    },
                                });
                            }}
                        >
                            Common House
                        </Button>
                    </HoverPopupExpandable>
                </Flex>
            </BuildableContainer>
        </Flex>
    );
}

export default Buildables;
