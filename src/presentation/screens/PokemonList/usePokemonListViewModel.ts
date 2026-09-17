import { type InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { getPokemonPage } from '@/application/useCases/getPokemonPage';
import { POKEMON_PAGINATION } from '@/domain/constants/pokemon.constants';
import type { PokemonPage } from '@/domain/models/PokemonPage';
import { QUERY_KEYS } from '@/presentation/constants/queryKeys.constants';
import { Route } from '@/presentation/enums/Route';
import { useGridLayout } from '@/presentation/hooks/useGridLayout';
import { toPokemonCardViewData } from '@/presentation/mappers/pokemonViewDataMapper';
import type { PokemonCardViewData } from '@/presentation/models/PokemonCardViewData';
import { useNavigation } from '@/presentation/navigation/useNavigation';
import type { PokemonListViewModel } from '@/presentation/screens/PokemonList/PokemonListScreen.types';
import { resolveErrorMessage } from '@/presentation/utils/resolveErrorMessage';
import { resolveListFooterStatus } from '@/presentation/utils/resolveListFooterStatus';
import { resolveScreenStatus } from '@/presentation/utils/resolveScreenStatus';

const EMPTY_POKEMONS: PokemonCardViewData[] = [];

const fetchPokemonPage = ({ pageParam }: { pageParam: number }) =>
  getPokemonPage({ offset: pageParam, limit: POKEMON_PAGINATION.PAGE_SIZE });

const getNextPageParam = (lastPage: PokemonPage): number | undefined =>
  lastPage.nextOffset ?? undefined;

const selectPokemonCards = (
  data: InfiniteData<PokemonPage, number>,
): PokemonCardViewData[] =>
  data.pages.flatMap(page => page.items).map(toPokemonCardViewData);

export const usePokemonListViewModel = (): PokemonListViewModel => {
  const { navigate } = useNavigation();
  const grid = useGridLayout();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: pokemons = EMPTY_POKEMONS,
    error,
    isPending,
    isError,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: QUERY_KEYS.pokemonList(),
    queryFn: fetchPokemonPage,
    initialPageParam: POKEMON_PAGINATION.INITIAL_OFFSET,
    getNextPageParam,
    select: selectPokemonCards,
  });

  const loadMore = useCallback(() => {
    const canLoadMore =
      hasNextPage && !isFetchingNextPage && !isFetchNextPageError;

    if (canLoadMore) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchNextPageError, isFetchingNextPage]);

  const retryLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const retry = useCallback(() => {
    refetch();
  }, [refetch]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  const selectPokemon = useCallback(
    ({ id, name }: PokemonCardViewData) =>
      navigate(Route.PokemonDetail, { pokemonId: id, pokemonName: name }),
    [navigate],
  );

  return {
    status: resolveScreenStatus({
      hasContent: pokemons.length > 0,
      isPending,
      isError,
    }),
    pokemons,
    error: resolveErrorMessage(error),
    footerStatus: resolveListFooterStatus({
      isFetchingNextPage,
      isFetchNextPageError,
    }),
    grid,
    isRefreshing,
    loadMore,
    retryLoadMore,
    refresh,
    retry,
    selectPokemon,
  };
};
