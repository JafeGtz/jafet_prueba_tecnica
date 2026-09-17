import type { StackEntry } from '@/presentation/types/navigation.types';

export interface StackScreenState {
  entry: StackEntry;
  isFocused: boolean;
  isRoot: boolean;
}
