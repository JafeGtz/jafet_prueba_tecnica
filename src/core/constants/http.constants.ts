import { MILLISECONDS } from '@/core/constants/time.constants';

export const HTTP_CONFIG = {
  BASE_URL: 'https://pokeapi.co/api/v2',
  REQUEST_TIMEOUT_MS: 8 * MILLISECONDS.SECOND,
  DEFAULT_HEADERS: {
    Accept: 'application/json',
  },
} as const;
