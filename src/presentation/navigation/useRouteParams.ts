import { useContext } from 'react';
import { NAVIGATION_ERRORS } from '@/presentation/constants/navigation.constants';
import type { Route } from '@/presentation/enums/Route';
import { RouteContext } from '@/presentation/navigation/RouteContext';
import type { RouteParamList } from '@/presentation/types/navigation.types';

export const useRouteParams = <R extends Route>(
  route: R,
): RouteParamList[R] => {
  const entry = useContext(RouteContext);

  if (entry?.route !== route) {
    throw new Error(NAVIGATION_ERRORS.ROUTE_MISMATCH(route));
  }

  return entry.params as RouteParamList[R];
};
