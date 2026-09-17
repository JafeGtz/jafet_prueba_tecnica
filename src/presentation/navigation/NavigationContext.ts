import { createContext } from 'react';
import type { NavigationContextValue } from '@/presentation/interfaces/NavigationContextValue';

export const NavigationContext = createContext<NavigationContextValue | null>(
  null,
);
