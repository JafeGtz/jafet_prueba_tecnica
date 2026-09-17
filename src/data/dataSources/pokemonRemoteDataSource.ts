import { httpClient } from '@/core/http/httpClient';
import { API_ENDPOINTS } from '@/data/constants/api.constants';
import type { PokemonDetailDto } from '@/data/dtos/PokemonDetailDto';
import type { PokemonListResponseDto } from '@/data/dtos/PokemonListResponseDto';
import type { PokemonRemoteDataSource } from '@/data/interfaces/PokemonRemoteDataSource';

export const pokemonRemoteDataSource: PokemonRemoteDataSource = {
  getPage: ({ offset, limit }) =>
    httpClient.get<PokemonListResponseDto>(API_ENDPOINTS.POKEMON, {
      offset,
      limit,
    }),

  getDetail: id =>
    httpClient.get<PokemonDetailDto>(`${API_ENDPOINTS.POKEMON}/${id}`),
};
