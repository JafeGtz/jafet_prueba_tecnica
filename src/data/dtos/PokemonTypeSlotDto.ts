import type { NamedApiResourceDto } from '@/data/dtos/NamedApiResourceDto';
import type { SlotDto } from '@/data/dtos/SlotDto';

export interface PokemonTypeSlotDto extends SlotDto {
  type: NamedApiResourceDto;
}
