import type { PokemonStatName } from '@/domain/enums/PokemonStatName';

export interface StatViewData {
  key: PokemonStatName;
  label: string;
  value: number;
  maxValue: number;
  ratio: number;
  accessibilityLabel: string;
}
