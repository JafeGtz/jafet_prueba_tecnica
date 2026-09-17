import {
  mapPokemonDetail,
  mapPokemonPage,
  mapPokemonSummary,
} from '@/data/mappers/pokemonMapper';
import { SPRITES_CONFIG } from '@/data/constants/api.constants';
import type { PokemonDetailDto } from '@/data/dtos/PokemonDetailDto';
import type { PokemonListResponseDto } from '@/data/dtos/PokemonListResponseDto';
import { PokemonStatName } from '@/domain/enums/PokemonStatName';
import { PokemonTypeName } from '@/domain/enums/PokemonTypeName';

const ARTWORK_BASE = SPRITES_CONFIG.OFFICIAL_ARTWORK_URL;

describe('mapPokemonSummary', () => {
  it('extracts the id from the trailing segment of the URL', () => {
    const result = mapPokemonSummary({
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    });
    expect(result.id).toBe(1);
  });

  it('sets the correct official-artwork image URL', () => {
    const result = mapPokemonSummary({
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    });
    expect(result.imageUrl).toBe(`${ARTWORK_BASE}/1.png`);
  });

  it('preserves the pokemon name', () => {
    const result = mapPokemonSummary({
      name: 'charmander',
      url: 'https://pokeapi.co/api/v2/pokemon/4/',
    });
    expect(result.name).toBe('charmander');
  });
});

describe('mapPokemonPage', () => {
  const baseDto: PokemonListResponseDto = {
    count: 151,
    next: null,
    previous: null,
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ],
  };

  it('sets nextOffset to offset + results length when next is not null', () => {
    const dto = {
      ...baseDto,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=20',
    };
    const result = mapPokemonPage(dto, { offset: 0, limit: 20 });
    expect(result.nextOffset).toBe(2);
  });

  it('sets nextOffset to null when next is null', () => {
    const result = mapPokemonPage(baseDto, { offset: 0, limit: 20 });
    expect(result.nextOffset).toBeNull();
  });

  it('maps all results to PokemonSummary items', () => {
    const result = mapPokemonPage(baseDto, { offset: 0, limit: 20 });
    expect(result.items).toHaveLength(2);
    expect(result.items[0].name).toBe('bulbasaur');
  });

  it('preserves totalCount from dto.count', () => {
    const result = mapPokemonPage(baseDto, { offset: 0, limit: 20 });
    expect(result.totalCount).toBe(151);
  });
});

describe('mapPokemonDetail', () => {
  const baseDto: PokemonDetailDto = {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    base_experience: 64,
    types: [
      { slot: 2, type: { name: 'poison', url: '' } },
      { slot: 1, type: { name: 'grass', url: '' } },
    ],
    abilities: [
      { slot: 3, ability: { name: 'chlorophyll', url: '' }, is_hidden: true },
      { slot: 1, ability: { name: 'overgrow', url: '' }, is_hidden: false },
    ],
    stats: [
      { base_stat: 45, effort: 0, stat: { name: 'hp', url: '' } },
      { base_stat: 49, effort: 0, stat: { name: 'attack', url: '' } },
    ],
    sprites: {
      front_default: null,
      other: {
        'official-artwork': {
          front_default: 'https://artwork.example.com/1.png',
        },
      },
    },
  };

  it('sorts types by slot', () => {
    const { types } = mapPokemonDetail(baseDto);
    expect(types[0]).toBe(PokemonTypeName.Grass);
    expect(types[1]).toBe(PokemonTypeName.Poison);
  });

  it('sorts abilities by slot', () => {
    const { abilities } = mapPokemonDetail(baseDto);
    expect(abilities[0].name).toBe('overgrow');
    expect(abilities[1].name).toBe('chlorophyll');
  });

  it('marks hidden abilities correctly', () => {
    const { abilities } = mapPokemonDetail(baseDto);
    expect(abilities[0].isHidden).toBe(false);
    expect(abilities[1].isHidden).toBe(true);
  });

  it('maps unknown type names to PokemonTypeName.Unknown', () => {
    const dto: PokemonDetailDto = {
      ...baseDto,
      types: [{ slot: 1, type: { name: 'stellar', url: '' } }],
    };
    const { types } = mapPokemonDetail(dto);
    expect(types[0]).toBe(PokemonTypeName.Unknown);
  });

  it('maps unknown stat names to PokemonStatName.Unknown', () => {
    const dto: PokemonDetailDto = {
      ...baseDto,
      stats: [
        { base_stat: 10, effort: 0, stat: { name: 'mystery-stat', url: '' } },
      ],
    };
    const { stats } = mapPokemonDetail(dto);
    expect(stats[0].name).toBe(PokemonStatName.Unknown);
  });

  it('uses the official-artwork URL when present', () => {
    const { imageUrl } = mapPokemonDetail(baseDto);
    expect(imageUrl).toBe('https://artwork.example.com/1.png');
  });

  it('falls back to the generated artwork URL when official-artwork is absent', () => {
    const dto: PokemonDetailDto = {
      ...baseDto,
      sprites: { front_default: null },
    };
    const { imageUrl } = mapPokemonDetail(dto);
    expect(imageUrl).toBe(`${ARTWORK_BASE}/1.png`);
  });

  it('falls back to the generated URL when official-artwork front_default is null', () => {
    const dto: PokemonDetailDto = {
      ...baseDto,
      sprites: {
        front_default: null,
        other: { 'official-artwork': { front_default: null } },
      },
    };
    const { imageUrl } = mapPokemonDetail(dto);
    expect(imageUrl).toBe(`${ARTWORK_BASE}/1.png`);
  });

  it('converts height from decimeters to meters', () => {
    const { heightInMeters } = mapPokemonDetail(baseDto);
    expect(heightInMeters).toBeCloseTo(0.7);
  });

  it('converts weight from hectograms to kilograms', () => {
    const { weightInKilograms } = mapPokemonDetail(baseDto);
    expect(weightInKilograms).toBeCloseTo(6.9);
  });

  it('preserves baseExperience including null', () => {
    const dto: PokemonDetailDto = { ...baseDto, base_experience: null };
    expect(mapPokemonDetail(dto).baseExperience).toBeNull();
  });
});
