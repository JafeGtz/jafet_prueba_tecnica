import NetInfo, { type NetInfoState } from '@react-native-community/netinfo';
import { NETWORK_CONFIG } from '@/core/constants/network.constants';
import { HttpStatus } from '@/core/enums/HttpStatus';
import type { Connectivity } from '@/core/interfaces/Connectivity';

const isReachable = ({
  isConnected,
  isInternetReachable,
}: NetInfoState): boolean =>
  isConnected !== false && isInternetReachable !== false;

export const configureConnectivity = (): void => {
  NetInfo.configure({
    reachabilityUrl: NETWORK_CONFIG.REACHABILITY_URL,
    reachabilityTest: async response => response.status === HttpStatus.Ok,
    reachabilityShortTimeout: NETWORK_CONFIG.REACHABILITY_SHORT_TIMEOUT_MS,
    reachabilityLongTimeout: NETWORK_CONFIG.REACHABILITY_LONG_TIMEOUT_MS,
    reachabilityRequestTimeout: NETWORK_CONFIG.REACHABILITY_REQUEST_TIMEOUT_MS,
  });
};

export const connectivity: Connectivity = {
  isOnline: async () => isReachable(await NetInfo.fetch()),
  subscribe: listener =>
    NetInfo.addEventListener(state => listener(isReachable(state))),
};
