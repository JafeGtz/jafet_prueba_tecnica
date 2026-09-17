import type { PokemonSummary } from '@/domain/models/PokemonSummary';

export interface PokemonPage {
  items: PokemonSummary[];
  totalCount: number;
  nextOffset: number | null;
}
