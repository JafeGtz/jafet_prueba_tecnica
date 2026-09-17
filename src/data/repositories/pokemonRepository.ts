import { pokemonLocalDataSource } from '@/data/dataSources/pokemonLocalDataSource';
import { pokemonRemoteDataSource } from '@/data/dataSources/pokemonRemoteDataSource';
import { mapPokemonDetail, mapPokemonPage } from '@/data/mappers/pokemonMapper';
import { networkFirst } from '@/data/policies/networkFirst';
import type { PokemonRepository } from '@/domain/repositories/PokemonRepository';

export const pokemonRepository: PokemonRepository = {
  getPokemonPage: request =>
    networkFirst({
      fetchRemote: async () =>
        mapPokemonPage(await pokemonRemoteDataSource.getPage(request), request),
      readLocal: () => pokemonLocalDataSource.getPage(request),
      saveLocal: page => pokemonLocalDataSource.savePage(request, page),
    }),

  getPokemonDetail: id =>
    networkFirst({
      fetchRemote: async () =>
        mapPokemonDetail(await pokemonRemoteDataSource.getDetail(id)),
      readLocal: () => pokemonLocalDataSource.getDetail(id),
      saveLocal: pokemonLocalDataSource.saveDetail,
    }),
};
