import { ErrorCode } from '@/core/enums/ErrorCode';
import { HttpStatus } from '@/core/enums/HttpStatus';

const KNOWN_STATUS_CODES: Partial<Record<HttpStatus, ErrorCode>> = {
  [HttpStatus.NotFound]: ErrorCode.NotFound,
};

const isServerError = (status: number): boolean =>
  status >= HttpStatus.InternalServerError;

export const httpStatusToErrorCode = (status: number): ErrorCode =>
  KNOWN_STATUS_CODES[status as HttpStatus] ??
  (isServerError(status) ? ErrorCode.Server : ErrorCode.Unknown);
