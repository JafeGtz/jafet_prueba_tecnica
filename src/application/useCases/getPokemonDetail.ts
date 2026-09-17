import { pokemonRepository } from '@/data/repositories/pokemonRepository';
import type { PokemonDetail } from '@/domain/models/PokemonDetail';

export const getPokemonDetail = (id: number): Promise<PokemonDetail> =>
  pokemonRepository.getPokemonDetail(id);
