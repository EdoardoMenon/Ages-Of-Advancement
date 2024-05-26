import { Button, Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import BuildableContainer from './BuildableContainer';
import { SaveDataContext } from '../../../contexts/SaveDataContext';
import BuildableButton from './BuildableButton';

function Buildables() {
    const { saveData, gatherResource, purchaseBuildingIfPossible } =
        useContext(SaveDataContext);

    return (
        <Flex direction="column" gap={4}>
            <BuildableContainer headingName="Gathering">
                <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
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
                <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
                    <BuildableButton
                        description="A common house for residents to live in"
                        buildingName="commonHouse"
                        purchaseOnClick={() =>
                            purchaseBuildingIfPossible(
                                'commonHouse',
                                {
                                    population: {
                                        ...saveData.population,
                                        maxWorkers:
                                            saveData.population.maxWorkers + 1,
                                        availableWorkers:
                                            saveData.population.maxWorkers + 1,
                                    },
                                    buildings: {
                                        ...saveData.buildings,
                                        commonHouse: {
                                            ...saveData.buildings.commonHouse,
                                            owned:
                                                saveData.buildings.commonHouse
                                                    .owned + 1,
                                        },
                                    },
                                },
                                true
                            )
                        }
                    />
                </Flex>
            </BuildableContainer>
            <BuildableContainer headingName="Production">
                <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
                    <BuildableButton
                        description="A place for workers to farm and grow food"
                        buildingName="farm"
                        purchaseOnClick={() =>
                            purchaseBuildingIfPossible('farm', {
                                buildings: {
                                    ...saveData.buildings,
                                    farm: {
                                        ...saveData.buildings.farm,
                                        owned:
                                            saveData.buildings.farm.owned + 1,
                                    },
                                },
                            })
                        }
                    />
                    <BuildableButton
                        description="A place for workers to cut down trees and collect lumber"
                        buildingName="lumbermill"
                        purchaseOnClick={() =>
                            purchaseBuildingIfPossible('lumbermill', {
                                buildings: {
                                    ...saveData.buildings,
                                    lumbermill: {
                                        ...saveData.buildings.lumbermill,
                                        owned:
                                            saveData.buildings.lumbermill
                                                .owned + 1,
                                    },
                                },
                            })
                        }
                    />
                    <BuildableButton
                        description="A place for workers to mine and collect stone"
                        buildingName="stoneQuarry"
                        purchaseOnClick={() =>
                            purchaseBuildingIfPossible('stoneQuarry', {
                                buildings: {
                                    ...saveData.buildings,
                                    stoneQuarry: {
                                        ...saveData.buildings.stoneQuarry,
                                        owned:
                                            saveData.buildings.stoneQuarry
                                                .owned + 1,
                                    },
                                },
                            })
                        }
                    />
                </Flex>
            </BuildableContainer>
        </Flex>
    );
}

export default Buildables;
