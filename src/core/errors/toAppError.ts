import { AppError } from '@/core/errors/AppError';
import { ErrorCode } from '@/core/enums/ErrorCode';
import type { ErrorResolver } from '@/core/interfaces/ErrorResolver';

const hasName = (error: unknown, name: string): boolean =>
  typeof error === 'object' &&
  error !== null &&
  (error as { name?: unknown }).name === name;

const ERROR_RESOLVERS: ReadonlyArray<ErrorResolver> = [
  { code: ErrorCode.Timeout, matches: error => hasName(error, 'AbortError') },
  { code: ErrorCode.Network, matches: error => error instanceof TypeError },
];

export const toAppError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  const resolver = ERROR_RESOLVERS.find(({ matches }) => matches(error));
  return new AppError(resolver?.code ?? ErrorCode.Unknown);
};
