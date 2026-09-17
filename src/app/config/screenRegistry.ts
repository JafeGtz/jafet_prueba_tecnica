import { Route } from '@/presentation/enums/Route';
import { PokemonDetailScreen } from '@/presentation/screens/PokemonDetail/PokemonDetailScreen';
import { PokemonListScreen } from '@/presentation/screens/PokemonList/PokemonListScreen';
import type { ScreenRegistry } from '@/presentation/types/navigation.types';

export const SCREEN_REGISTRY: ScreenRegistry = {
  [Route.PokemonList]: PokemonListScreen,
  [Route.PokemonDetail]: PokemonDetailScreen,
};
