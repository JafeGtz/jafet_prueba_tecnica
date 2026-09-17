export const QUERY_KEYS = {
  pokemonList: () => ['pokemon', 'list'] as const,
  pokemonDetail: (id: number) => ['pokemon', 'detail', id] as const,
};
