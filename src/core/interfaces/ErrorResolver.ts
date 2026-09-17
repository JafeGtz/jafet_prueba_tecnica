import type { ErrorCode } from '@/core/enums/ErrorCode';

export interface ErrorResolver {
  code: ErrorCode;
  matches(error: unknown): boolean;
}
