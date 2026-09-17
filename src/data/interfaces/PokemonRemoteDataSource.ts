import type { PokemonDetailDto } from '@/data/dtos/PokemonDetailDto';
import type { PokemonListResponseDto } from '@/data/dtos/PokemonListResponseDto';
import type { PageRequest } from '@/domain/models/PageRequest';

export interface PokemonRemoteDataSource {
  getPage(request: PageRequest): Promise<PokemonListResponseDto>;
  getDetail(id: number): Promise<PokemonDetailDto>;
}
