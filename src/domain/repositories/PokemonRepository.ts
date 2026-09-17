import type { PageRequest } from '@/domain/models/PageRequest';
import type { PokemonDetail } from '@/domain/models/PokemonDetail';
import type { PokemonPage } from '@/domain/models/PokemonPage';

export interface PokemonRepository {
  getPokemonPage(request: PageRequest): Promise<PokemonPage>;
  getPokemonDetail(id: number): Promise<PokemonDetail>;
}
