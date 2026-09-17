import type { PokemonStatName } from '@/domain/enums/PokemonStatName';

export interface PokemonStat {
  name: PokemonStatName;
  baseValue: number;
}
