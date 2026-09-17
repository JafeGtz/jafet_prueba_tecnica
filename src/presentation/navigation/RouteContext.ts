import { createContext } from 'react';
import type { StackEntry } from '@/presentation/types/navigation.types';

export const RouteContext = createContext<StackEntry | null>(null);
