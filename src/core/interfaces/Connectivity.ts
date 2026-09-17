import type {
  ConnectivityListener,
  Unsubscribe,
} from '@/core/types/connectivity.types';

export interface Connectivity {
  isOnline(): Promise<boolean>;
  subscribe(listener: ConnectivityListener): Unsubscribe;
}
