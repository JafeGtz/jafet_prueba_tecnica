import type {
  ParamlessRoute,
  ScreenRegistry,
} from '@/presentation/types/navigation.types';

export interface StackNavigatorProps {
  initialRoute: ParamlessRoute;
  screens: ScreenRegistry;
}
