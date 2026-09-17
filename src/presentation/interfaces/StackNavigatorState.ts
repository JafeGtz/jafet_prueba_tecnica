import type { NavigationContextValue } from '@/presentation/interfaces/NavigationContextValue';
import type { StackScreenState } from '@/presentation/interfaces/StackScreenState';

export interface StackNavigatorState {
  navigation: NavigationContextValue;
  screens: StackScreenState[];
  removeEntry(key: string): void;
}
