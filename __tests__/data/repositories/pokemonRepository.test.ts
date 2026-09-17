jest.mock('@/data/dataSources/pokemonLocalDataSource');
jest.mock('@/data/dataSources/pokemonRemoteDataSource');
jest.mock('@/core/network/connectivity', () => ({
  connectivity: {
    isOnline: jest.fn(),
    subscribe: jest.fn(),
  },
}));

import { connectivity } from '@/core/network/connectivity';
import { pokemonLocalDataSource } from '@/data/dataSources/pokemonLocalDataSource';
import { pokemonRemoteDataSource } from '@/data/dataSources/pokemonRemoteDataSource';
import type { PokemonDetailDto } from '@/data/dtos/PokemonDetailDto';
import type { PokemonListResponseDto } from '@/data/dtos/PokemonListResponseDto';
import { pokemonRepository } from '@/data/repositories/pokemonRepository';
import { PokemonStatName } from '@/domain/enums/PokemonStatName';
import { PokemonTypeName } from '@/domain/enums/PokemonTypeName';

const isOnline = jest.mocked(connectivity.isOnline);
const remoteGetPage = jest.mocked(pokemonRemoteDataSource.getPage);
const remoteGetDetail = jest.mocked(pokemonRemoteDataSource.getDetail);
const localGetPage = jest.mocked(pokemonLocalDataSource.getPage);
const localGetDetail = jest.mocked(pokemonLocalDataSource.getDetail);
const localSavePage = jest.mocked(pokemonLocalDataSource.savePage);
const localSaveDetail = jest.mocked(pokemonLocalDataSource.saveDetail);

const pageDto: PokemonListResponseDto = {
  count: 151,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20',
  previous: null,
  results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
};

const detailDto: PokemonDetailDto = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  types: [{ slot: 1, type: { name: 'grass', url: '' } }],
  abilities: [
    { slot: 1, ability: { name: 'overgrow', url: '' }, is_hidden: false },
  ],
  stats: [{ base_stat: 45, effort: 0, stat: { name: 'hp', url: '' } }],
  sprites: {
    front_default: null,
    other: {
      'official-artwork': { front_default: 'https://art.example.com/1.png' },
    },
  },
};

describe('pokemonRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localSavePage.mockResolvedValue(undefined);
    localSaveDetail.mockResolvedValue(undefined);
  });

  describe('getPokemonPage', () => {
    it('fetches from remote, maps the result, and persists it when online', async () => {
      isOnline.mockResolvedValue(true);
      remoteGetPage.mockResolvedValue(pageDto);

      const result = await pokemonRepository.getPokemonPage({
        offset: 0,
        limit: 20,
      });

      expect(remoteGetPage).toHaveBeenCalledWith({ offset: 0, limit: 20 });
      expect(localSavePage).toHaveBeenCalled();
      expect(result.items[0].name).toBe('bulbasaur');
      expect(result.totalCount).toBe(151);
    });

    it('returns the mapped domain model with correct nextOffset when online', async () => {
      isOnline.mockResolvedValue(true);
      remoteGetPage.mockResolvedValue(pageDto);

      const result = await pokemonRepository.getPokemonPage({
        offset: 0,
        limit: 20,
      });

      expect(result.nextOffset).toBe(1);
    });

    it('falls back to cached page when remote fails', async () => {
      const cached = {
        items: [{ id: 1, name: 'bulbasaur', imageUrl: 'url' }],
        totalCount: 151,
        nextOffset: null,
      };
      isOnline.mockResolvedValue(true);
      remoteGetPage.mockRejectedValue(new Error('network error'));
      localGetPage.mockResolvedValue(cached);

      const result = await pokemonRepository.getPokemonPage({
        offset: 0,
        limit: 20,
      });

      expect(result).toEqual(cached);
    });

    it('returns cached page without hitting remote when offline', async () => {
      const cached = {
        items: [{ id: 1, name: 'bulbasaur', imageUrl: 'url' }],
        totalCount: 151,
        nextOffset: null,
      };
      isOnline.mockResolvedValue(false);
      localGetPage.mockResolvedValue(cached);

      const result = await pokemonRepository.getPokemonPage({
        offset: 0,
        limit: 20,
      });

      expect(remoteGetPage).not.toHaveBeenCalled();
      expect(result).toEqual(cached);
    });
  });

  describe('getPokemonDetail', () => {
    it('fetches from remote, maps the result, and persists it when online', async () => {
      isOnline.mockResolvedValue(true);
      remoteGetDetail.mockResolvedValue(detailDto);

      const result = await pokemonRepository.getPokemonDetail(1);

      expect(remoteGetDetail).toHaveBeenCalledWith(1);
      expect(localSaveDetail).toHaveBeenCalled();
      expect(result.name).toBe('bulbasaur');
      expect(result.types).toContain(PokemonTypeName.Grass);
      expect(result.stats[0].name).toBe(PokemonStatName.Hp);
    });

    it('returns cached detail without hitting remote when offline', async () => {
      const cached = {
        id: 1,
        name: 'bulbasaur',
        imageUrl: 'url',
        types: [PokemonTypeName.Grass],
        abilities: [],
        stats: [],
        heightInMeters: 0.7,
        weightInKilograms: 6.9,
        baseExperience: 64,
      };
      isOnline.mockResolvedValue(false);
      localGetDetail.mockResolvedValue(cached);

      const result = await pokemonRepository.getPokemonDetail(1);

      expect(remoteGetDetail).not.toHaveBeenCalled();
      expect(result).toEqual(cached);
    });
  });
});
