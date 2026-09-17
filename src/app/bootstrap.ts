import { focusManager, onlineManager } from '@tanstack/react-query';
import { AppState, type AppStateStatus } from 'react-native';
import {
  configureConnectivity,
  connectivity,
} from '@/core/network/connectivity';

const ACTIVE_APP_STATE: AppStateStatus = 'active';

const bindOnlineManager = (): void => {
  onlineManager.setEventListener(setOnline =>
    connectivity.subscribe(setOnline),
  );
};

const bindFocusManager = (): void => {
  focusManager.setEventListener(handleFocus => {
    const subscription = AppState.addEventListener('change', state =>
      handleFocus(state === ACTIVE_APP_STATE),
    );
    return () => subscription.remove();
  });
};

export const bootstrap = (): void => {
  configureConnectivity();
  bindOnlineManager();
  bindFocusManager();
};
