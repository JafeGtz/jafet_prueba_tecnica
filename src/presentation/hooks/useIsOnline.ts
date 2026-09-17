import { onlineManager } from '@tanstack/react-query';
import { useSyncExternalStore } from 'react';

const subscribe = (onStoreChange: () => void) =>
  onlineManager.subscribe(onStoreChange);

const getSnapshot = () => onlineManager.isOnline();

export const useIsOnline = (): boolean =>
  useSyncExternalStore(subscribe, getSnapshot);
