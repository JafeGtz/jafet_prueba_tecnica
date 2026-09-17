import { QueryClient } from '@tanstack/react-query';
import {
  QUERY_CONFIG,
  RETRYABLE_ERROR_CODES,
} from '@/core/constants/query.constants';
import type { AppError } from '@/core/errors/AppError';

const shouldRetry = (failureCount: number, error: AppError): boolean =>
  failureCount < QUERY_CONFIG.MAX_RETRIES &&
  RETRYABLE_ERROR_CODES.has(error.code);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.STALE_TIME_MS,
      gcTime: QUERY_CONFIG.GC_TIME_MS,
      networkMode: QUERY_CONFIG.NETWORK_MODE,
      refetchOnReconnect: QUERY_CONFIG.REFETCH_ON_RECONNECT,
      retry: shouldRetry,
    },
  },
});
