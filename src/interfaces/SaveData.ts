import { Buildings } from './Buildings';
import { Population } from './Population';
import { Research } from './Research';
import { Resources } from './Resources';
import { Stats } from './Stats';

export interface SaveData {
    stats: Stats;
    resources: Resources;
    population: Population;
    buildings: Buildings;
    research: Research;
    clickingPower: number;
}
