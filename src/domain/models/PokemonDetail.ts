import type { PokemonTypeName } from '@/domain/enums/PokemonTypeName';
import type { PokemonAbility } from '@/domain/models/PokemonAbility';
import type { PokemonStat } from '@/domain/models/PokemonStat';

export interface PokemonDetail {
  id: number;
  name: string;
  imageUrl: string;
  types: PokemonTypeName[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  heightInMeters: number;
  weightInKilograms: number;
  baseExperience: number | null;
}
