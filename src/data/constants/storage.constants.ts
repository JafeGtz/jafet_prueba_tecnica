import type { PageRequest } from '@/domain/models/PageRequest';

const STORAGE_NAMESPACE = '@pokedex/v1';

export const STORAGE_KEYS = {
  pokemonPage: ({ offset, limit }: PageRequest) =>
    `${STORAGE_NAMESPACE}/pokemon/page/${offset}-${limit}`,
  pokemonDetail: (id: number) => `${STORAGE_NAMESPACE}/pokemon/detail/${id}`,
} as const;
