import { PokemonTypeName } from '@/domain/enums/PokemonTypeName';
import type { TypeColorScheme } from '@/presentation/interfaces/TypeColorScheme';

const DARK_TEXT = '#1B1D2A';
const LIGHT_TEXT = '#FFFFFF';

export const typeColors: Record<PokemonTypeName, TypeColorScheme> = {
  [PokemonTypeName.Normal]: { background: '#A8A77A', foreground: DARK_TEXT },
  [PokemonTypeName.Fire]: { background: '#EE8130', foreground: DARK_TEXT },
  [PokemonTypeName.Water]: { background: '#6390F0', foreground: DARK_TEXT },
  [PokemonTypeName.Grass]: { background: '#7AC74C', foreground: DARK_TEXT },
  [PokemonTypeName.Electric]: { background: '#F7D02C', foreground: DARK_TEXT },
  [PokemonTypeName.Ice]: { background: '#96D9D6', foreground: DARK_TEXT },
  [PokemonTypeName.Fighting]: { background: '#C22E28', foreground: LIGHT_TEXT },
  [PokemonTypeName.Poison]: { background: '#A33EA1', foreground: LIGHT_TEXT },
  [PokemonTypeName.Ground]: { background: '#E2BF65', foreground: DARK_TEXT },
  [PokemonTypeName.Flying]: { background: '#A98FF3', foreground: DARK_TEXT },
  [PokemonTypeName.Psychic]: { background: '#F95587', foreground: DARK_TEXT },
  [PokemonTypeName.Bug]: { background: '#A6B91A', foreground: DARK_TEXT },
  [PokemonTypeName.Rock]: { background: '#B6A136', foreground: DARK_TEXT },
  [PokemonTypeName.Ghost]: { background: '#735797', foreground: LIGHT_TEXT },
  [PokemonTypeName.Dragon]: { background: '#6F35FC', foreground: LIGHT_TEXT },
  [PokemonTypeName.Dark]: { background: '#705746', foreground: LIGHT_TEXT },
  [PokemonTypeName.Steel]: { background: '#B7B7CE', foreground: DARK_TEXT },
  [PokemonTypeName.Fairy]: { background: '#D685AD', foreground: DARK_TEXT },
  [PokemonTypeName.Unknown]: { background: '#68A090', foreground: DARK_TEXT },
};
