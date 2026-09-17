import { FORMAT } from '@/presentation/constants/format.constants';
import { STRINGS } from '@/presentation/constants/strings.constants';

const capitalize = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const formatPokemonName = (name: string): string =>
  name.split(FORMAT.NAME_SEPARATOR).map(capitalize).join(FORMAT.WORD_SEPARATOR);

export const formatPokedexNumber = (id: number): string =>
  `${FORMAT.POKEDEX_NUMBER_PREFIX}${String(id).padStart(
    FORMAT.POKEDEX_NUMBER_DIGITS,
    FORMAT.POKEDEX_NUMBER_PAD,
  )}`;

export const formatMeasurement = (value: number, unit: string): string =>
  `${value.toFixed(FORMAT.MEASUREMENT_DECIMALS)} ${unit}`;

export const formatOptionalNumber = (value: number | null): string =>
  value?.toString() ?? STRINGS.common.emptyValue;
