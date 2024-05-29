import { Buildings } from './Buildings';
import { Event } from './Events';
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
  events: Event[];
  clickingPower: number;
}
