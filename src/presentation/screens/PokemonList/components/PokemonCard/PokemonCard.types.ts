import type { DimensionValue } from 'react-native';
import type { PokemonCardViewData } from '@/presentation/models/PokemonCardViewData';

export interface PokemonCardProps {
  pokemon: PokemonCardViewData;
  width: DimensionValue;
  onPress(pokemon: PokemonCardViewData): void;
}
