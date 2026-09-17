import { PokemonStatName } from '@/domain/enums/PokemonStatName';
import { PokemonTypeName } from '@/domain/enums/PokemonTypeName';

export const POKEMON_TYPE_LABELS: Record<PokemonTypeName, string> = {
  [PokemonTypeName.Normal]: 'Normal',
  [PokemonTypeName.Fire]: 'Fuego',
  [PokemonTypeName.Water]: 'Agua',
  [PokemonTypeName.Grass]: 'Planta',
  [PokemonTypeName.Electric]: 'Eléctrico',
  [PokemonTypeName.Ice]: 'Hielo',
  [PokemonTypeName.Fighting]: 'Lucha',
  [PokemonTypeName.Poison]: 'Veneno',
  [PokemonTypeName.Ground]: 'Tierra',
  [PokemonTypeName.Flying]: 'Volador',
  [PokemonTypeName.Psychic]: 'Psíquico',
  [PokemonTypeName.Bug]: 'Bicho',
  [PokemonTypeName.Rock]: 'Roca',
  [PokemonTypeName.Ghost]: 'Fantasma',
  [PokemonTypeName.Dragon]: 'Dragón',
  [PokemonTypeName.Dark]: 'Siniestro',
  [PokemonTypeName.Steel]: 'Acero',
  [PokemonTypeName.Fairy]: 'Hada',
  [PokemonTypeName.Unknown]: 'Desconocido',
};

export const POKEMON_STAT_LABELS: Record<PokemonStatName, string> = {
  [PokemonStatName.Hp]: 'PS',
  [PokemonStatName.Attack]: 'Ataque',
  [PokemonStatName.Defense]: 'Defensa',
  [PokemonStatName.SpecialAttack]: 'At. Esp.',
  [PokemonStatName.SpecialDefense]: 'Def. Esp.',
  [PokemonStatName.Speed]: 'Velocidad',
  [PokemonStatName.Unknown]: 'Otro',
};
