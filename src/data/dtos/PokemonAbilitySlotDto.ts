import type { NamedApiResourceDto } from '@/data/dtos/NamedApiResourceDto';
import type { SlotDto } from '@/data/dtos/SlotDto';

export interface PokemonAbilitySlotDto extends SlotDto {
  is_hidden: boolean;
  ability: NamedApiResourceDto;
}
