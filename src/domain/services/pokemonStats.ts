import { clamp } from '@/core/utils/clamp';
import { POKEMON_STATS } from '@/domain/constants/pokemon.constants';
import type { PokemonStat } from '@/domain/models/PokemonStat';

export const calculateTotalBaseStats = (stats: PokemonStat[]): number =>
  stats.reduce((total, stat) => total + stat.baseValue, 0);

export const calculateStatRatio = (baseValue: number): number =>
  clamp(baseValue / POKEMON_STATS.MAX_BASE_VALUE, 0, 1);
