import type { PokemonTypeName } from '@/domain/enums/PokemonTypeName';
import type { TypeColorScheme } from '@/presentation/interfaces/TypeColorScheme';

export interface TypeBadgeViewData {
  key: PokemonTypeName;
  label: string;
  colors: TypeColorScheme;
}
