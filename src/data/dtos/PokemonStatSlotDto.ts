import type { NamedApiResourceDto } from '@/data/dtos/NamedApiResourceDto';

export interface PokemonStatSlotDto {
  base_stat: number;
  effort: number;
  stat: NamedApiResourceDto;
}
