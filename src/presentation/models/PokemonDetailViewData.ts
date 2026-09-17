import type { AbilityViewData } from '@/presentation/models/AbilityViewData';
import type { MeasurementViewData } from '@/presentation/models/MeasurementViewData';
import type { StatViewData } from '@/presentation/models/StatViewData';
import type { TypeBadgeViewData } from '@/presentation/models/TypeBadgeViewData';

export interface PokemonDetailViewData {
  id: number;
  name: string;
  number: string;
  imageUrl: string;
  accentColor: string;
  types: TypeBadgeViewData[];
  typesAccessibilityLabel: string;
  measurements: MeasurementViewData[];
  abilities: AbilityViewData[];
  stats: StatViewData[];
  totalStats: string;
}
