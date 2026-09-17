import type { Route } from '@/presentation/enums/Route';
import type { RouteParamList } from '@/presentation/types/navigation.types';

export interface NavigationContextValue {
  canGoBack: boolean;
  navigate<R extends Route>(route: R, params: RouteParamList[R]): void;
  goBack(): void;
}
