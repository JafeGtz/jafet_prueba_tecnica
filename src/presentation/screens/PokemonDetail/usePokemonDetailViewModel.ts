import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { getPokemonDetail } from '@/application/useCases/getPokemonDetail';
import { QUERY_KEYS } from '@/presentation/constants/queryKeys.constants';
import { Route } from '@/presentation/enums/Route';
import { formatPokedexNumber } from '@/presentation/formatters/pokemonFormatters';
import { toPokemonDetailViewData } from '@/presentation/mappers/pokemonViewDataMapper';
import { useNavigation } from '@/presentation/navigation/useNavigation';
import { useRouteParams } from '@/presentation/navigation/useRouteParams';
import type { PokemonDetailViewModel } from '@/presentation/screens/PokemonDetail/PokemonDetailScreen.types';
import { resolveErrorMessage } from '@/presentation/utils/resolveErrorMessage';
import { resolveScreenStatus } from '@/presentation/utils/resolveScreenStatus';

export const usePokemonDetailViewModel = (): PokemonDetailViewModel => {
  const { pokemonId, pokemonName } = useRouteParams(Route.PokemonDetail);
  const { goBack } = useNavigation();

  const { data, error, isPending, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.pokemonDetail(pokemonId),
    queryFn: () => getPokemonDetail(pokemonId),
    select: toPokemonDetailViewData,
  });

  const retry = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    title: pokemonName,
    subtitle: formatPokedexNumber(pokemonId),
    status: resolveScreenStatus({
      hasContent: data !== undefined,
      isPending,
      isError,
    }),
    detail: data,
    error: resolveErrorMessage(error),
    retry,
    goBack,
  };
};
