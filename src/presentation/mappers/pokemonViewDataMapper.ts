import { POKEMON_STATS } from '@/domain/constants/pokemon.constants';
import { PokemonTypeName } from '@/domain/enums/PokemonTypeName';
import type { PokemonAbility } from '@/domain/models/PokemonAbility';
import type { PokemonDetail } from '@/domain/models/PokemonDetail';
import type { PokemonStat } from '@/domain/models/PokemonStat';
import type { PokemonSummary } from '@/domain/models/PokemonSummary';
import {
  calculateStatRatio,
  calculateTotalBaseStats,
} from '@/domain/services/pokemonStats';
import { FORMAT } from '@/presentation/constants/format.constants';
import {
  POKEMON_STAT_LABELS,
  POKEMON_TYPE_LABELS,
} from '@/presentation/constants/pokemonLabels.constants';
import { STRINGS } from '@/presentation/constants/strings.constants';
import { AbilityVariant } from '@/presentation/enums/AbilityVariant';
import {
  formatMeasurement,
  formatOptionalNumber,
  formatPokedexNumber,
  formatPokemonName,
} from '@/presentation/formatters/pokemonFormatters';
import type { AbilityViewData } from '@/presentation/models/AbilityViewData';
import type { MeasurementViewData } from '@/presentation/models/MeasurementViewData';
import type { PokemonCardViewData } from '@/presentation/models/PokemonCardViewData';
import type { PokemonDetailViewData } from '@/presentation/models/PokemonDetailViewData';
import type { StatViewData } from '@/presentation/models/StatViewData';
import type { TypeBadgeViewData } from '@/presentation/models/TypeBadgeViewData';
import { typeColors } from '@/presentation/theme/typeColors';

const { pokemonDetail: DETAIL_STRINGS } = STRINGS;

const toTypeBadge = (type: PokemonTypeName): TypeBadgeViewData => ({
  key: type,
  label: POKEMON_TYPE_LABELS[type],
  colors: typeColors[type],
});

const toAbilityVariant = (isHidden: boolean): AbilityVariant =>
  isHidden ? AbilityVariant.Hidden : AbilityVariant.Regular;

const toAbility = ({ name, isHidden }: PokemonAbility): AbilityViewData => {
  const variant = toAbilityVariant(isHidden);
  return {
    key: name,
    variant,
    label: DETAIL_STRINGS.abilityLabel[variant](formatPokemonName(name)),
  };
};

const toStat = ({ name, baseValue }: PokemonStat): StatViewData => {
  const label = POKEMON_STAT_LABELS[name];
  return {
    key: name,
    label,
    value: baseValue,
    maxValue: POKEMON_STATS.MAX_BASE_VALUE,
    ratio: calculateStatRatio(baseValue),
    accessibilityLabel: DETAIL_STRINGS.statLabel(
      label,
      baseValue,
      POKEMON_STATS.MAX_BASE_VALUE,
    ),
  };
};

const toMeasurements = (detail: PokemonDetail): MeasurementViewData[] => [
  {
    key: 'height',
    label: DETAIL_STRINGS.height,
    value: formatMeasurement(detail.heightInMeters, STRINGS.units.meters),
  },
  {
    key: 'weight',
    label: DETAIL_STRINGS.weight,
    value: formatMeasurement(detail.weightInKilograms, STRINGS.units.kilograms),
  },
  {
    key: 'baseExperience',
    label: DETAIL_STRINGS.baseExperience,
    value: formatOptionalNumber(detail.baseExperience),
  },
];

export const toPokemonCardViewData = ({
  id,
  name,
  imageUrl,
}: PokemonSummary): PokemonCardViewData => {
  const displayName = formatPokemonName(name);
  return {
    key: String(id),
    id,
    name: displayName,
    number: formatPokedexNumber(id),
    imageUrl,
    accessibilityLabel: STRINGS.pokemonList.cardLabel(displayName, id),
  };
};

export const toPokemonDetailViewData = (
  detail: PokemonDetail,
): PokemonDetailViewData => {
  const types = detail.types.map(toTypeBadge);
  const [primaryType = PokemonTypeName.Unknown] = detail.types;

  return {
    id: detail.id,
    name: formatPokemonName(detail.name),
    number: formatPokedexNumber(detail.id),
    imageUrl: detail.imageUrl,
    accentColor: typeColors[primaryType].background,
    types,
    typesAccessibilityLabel: DETAIL_STRINGS.typesLabel(
      types.map(type => type.label).join(FORMAT.LIST_SEPARATOR),
    ),
    measurements: toMeasurements(detail),
    abilities: detail.abilities.map(toAbility),
    stats: detail.stats.map(toStat),
    totalStats: String(calculateTotalBaseStats(detail.stats)),
  };
};
