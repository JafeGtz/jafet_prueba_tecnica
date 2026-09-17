import type { ComponentType } from 'react';
import type { StackScreenState } from '@/presentation/interfaces/StackScreenState';

export interface StackScreenProps extends StackScreenState {
  component: ComponentType;
  onClosed(key: string): void;
}
