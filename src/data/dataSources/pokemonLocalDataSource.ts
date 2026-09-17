import { keyValueStorage } from '@/core/storage/keyValueStorage';
import { STORAGE_KEYS } from '@/data/constants/storage.constants';
import type { PokemonLocalDataSource } from '@/data/interfaces/PokemonLocalDataSource';
import type { PokemonDetail } from '@/domain/models/PokemonDetail';
import type { PokemonPage } from '@/domain/models/PokemonPage';

export const pokemonLocalDataSource: PokemonLocalDataSource = {
  getPage: request =>
    keyValueStorage.getItem<PokemonPage>(STORAGE_KEYS.pokemonPage(request)),

  savePage: (request, page) =>
    keyValueStorage.setItem(STORAGE_KEYS.pokemonPage(request), page),

  getDetail: id =>
    keyValueStorage.getItem<PokemonDetail>(STORAGE_KEYS.pokemonDetail(id)),

  saveDetail: detail =>
    keyValueStorage.setItem(STORAGE_KEYS.pokemonDetail(detail.id), detail),
};
