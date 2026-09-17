import type { Route } from '@/presentation/enums/Route';
import type {
  RouteParamList,
  StackEntry,
} from '@/presentation/types/navigation.types';

let entrySequence = 0;

export const createStackEntry = <R extends Route>(
  route: R,
  params: RouteParamList[R],
): StackEntry => {
  entrySequence += 1;
  return {
    key: `${route}-${entrySequence}`,
    route,
    params,
    isClosing: false,
  } as StackEntry;
};
