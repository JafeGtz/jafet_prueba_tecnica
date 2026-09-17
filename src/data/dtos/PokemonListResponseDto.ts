import type { NamedApiResourceDto } from '@/data/dtos/NamedApiResourceDto';

export interface PokemonListResponseDto {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedApiResourceDto[];
}
