import { pokemonRepository } from '@/data/repositories/pokemonRepository';
import type { PageRequest } from '@/domain/models/PageRequest';
import type { PokemonPage } from '@/domain/models/PokemonPage';

export const getPokemonPage = (request: PageRequest): Promise<PokemonPage> =>
  pokemonRepository.getPokemonPage(request);
