import { isEnumValue } from '@/core/utils/isEnumValue';
import {
  SPRITES_CONFIG,
  UNIT_CONVERSION,
} from '@/data/constants/api.constants';
import type { NamedApiResourceDto } from '@/data/dtos/NamedApiResourceDto';
import type { PokemonDetailDto } from '@/data/dtos/PokemonDetailDto';
import type { PokemonListResponseDto } from '@/data/dtos/PokemonListResponseDto';
import type { SlotDto } from '@/data/dtos/SlotDto';
import { PokemonStatName } from '@/domain/enums/PokemonStatName';
import { PokemonTypeName } from '@/domain/enums/PokemonTypeName';
import type { PageRequest } from '@/domain/models/PageRequest';
import type { PokemonDetail } from '@/domain/models/PokemonDetail';
import type { PokemonPage } from '@/domain/models/PokemonPage';
import type { PokemonSummary } from '@/domain/models/PokemonSummary';

const extractIdFromUrl = (url: string): number =>
  Number(url.split('/').filter(Boolean).pop());

const buildArtworkUrl = (id: number): string =>
  `${SPRITES_CONFIG.OFFICIAL_ARTWORK_URL}/${id}.png`;

const bySlot = (first: SlotDto, second: SlotDto): number =>
  first.slot - second.slot;

const toTypeName = (name: string): PokemonTypeName =>
  isEnumValue(PokemonTypeName, name) ? name : PokemonTypeName.Unknown;

const toStatName = (name: string): PokemonStatName =>
  isEnumValue(PokemonStatName, name) ? name : PokemonStatName.Unknown;

export const mapPokemonSummary = ({
  name,
  url,
}: NamedApiResourceDto): PokemonSummary => {
  const id = extractIdFromUrl(url);
  return { id, name, imageUrl: buildArtworkUrl(id) };
};

export const mapPokemonPage = (
  dto: PokemonListResponseDto,
  { offset }: PageRequest,
): PokemonPage => ({
  items: dto.results.map(mapPokemonSummary),
  totalCount: dto.count,
  nextOffset: dto.next === null ? null : offset + dto.results.length,
});

export const mapPokemonDetail = (dto: PokemonDetailDto): PokemonDetail => ({
  id: dto.id,
  name: dto.name,
  imageUrl:
    dto.sprites.other?.['official-artwork']?.front_default ??
    buildArtworkUrl(dto.id),
  types: [...dto.types].sort(bySlot).map(({ type }) => toTypeName(type.name)),
  abilities: [...dto.abilities].sort(bySlot).map(({ ability, is_hidden }) => ({
    name: ability.name,
    isHidden: is_hidden,
  })),
  stats: dto.stats.map(({ stat, base_stat }) => ({
    name: toStatName(stat.name),
    baseValue: base_stat,
  })),
  heightInMeters: dto.height / UNIT_CONVERSION.DECIMETERS_PER_METER,
  weightInKilograms: dto.weight / UNIT_CONVERSION.HECTOGRAMS_PER_KILOGRAM,
  baseExperience: dto.base_experience,
});
