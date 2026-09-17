import type { ComponentType } from 'react';
import type { NavigationActionType } from '@/presentation/enums/NavigationActionType';
import type { Route } from '@/presentation/enums/Route';

export type RouteParamList = {
  [Route.PokemonList]: undefined;
  [Route.PokemonDetail]: { pokemonId: number; pokemonName: string };
};

export type ParamlessRoute = {
  [R in Route]: RouteParamList[R] extends undefined ? R : never;
}[Route];

export type StackEntry = {
  [R in Route]: {
    key: string;
    route: R;
    params: RouteParamList[R];
    isClosing: boolean;
  };
}[Route];

export type NavigationAction =
  | { type: NavigationActionType.Push; entry: StackEntry }
  | { type: NavigationActionType.Close }
  | { type: NavigationActionType.Remove; key: string };

export type ScreenRegistry = Record<Route, ComponentType>;
