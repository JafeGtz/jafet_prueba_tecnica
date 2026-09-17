import { MILLISECONDS } from '@/core/constants/time.constants';
import { ErrorCode } from '@/core/enums/ErrorCode';

export const QUERY_CONFIG = {
  STALE_TIME_MS: 5 * MILLISECONDS.MINUTE,
  GC_TIME_MS: 30 * MILLISECONDS.MINUTE,
  MAX_RETRIES: 2,
  NETWORK_MODE: 'offlineFirst',
  REFETCH_ON_RECONNECT: 'always',
} as const;

export const RETRYABLE_ERROR_CODES: ReadonlySet<ErrorCode> = new Set([
  ErrorCode.Network,
  ErrorCode.Server,
]);
