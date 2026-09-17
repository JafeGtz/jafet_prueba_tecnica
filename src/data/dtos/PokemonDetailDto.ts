import type { PokemonAbilitySlotDto } from '@/data/dtos/PokemonAbilitySlotDto';
import type { PokemonSpritesDto } from '@/data/dtos/PokemonSpritesDto';
import type { PokemonStatSlotDto } from '@/data/dtos/PokemonStatSlotDto';
import type { PokemonTypeSlotDto } from '@/data/dtos/PokemonTypeSlotDto';

export interface PokemonDetailDto {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number | null;
  types: PokemonTypeSlotDto[];
  abilities: PokemonAbilitySlotDto[];
  stats: PokemonStatSlotDto[];
  sprites: PokemonSpritesDto;
}
