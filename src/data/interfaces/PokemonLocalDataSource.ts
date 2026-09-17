import type { PageRequest } from '@/domain/models/PageRequest';
import type { PokemonDetail } from '@/domain/models/PokemonDetail';
import type { PokemonPage } from '@/domain/models/PokemonPage';

export interface PokemonLocalDataSource {
  getPage(request: PageRequest): Promise<PokemonPage | null>;
  savePage(request: PageRequest, page: PokemonPage): Promise<void>;
  getDetail(id: number): Promise<PokemonDetail | null>;
  saveDetail(detail: PokemonDetail): Promise<void>;
}
